package com.sisgem.main.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sisgem.main.entity.Usuario;
import com.sisgem.main.repository.DTO.authentication.LoginRequest;
import com.sisgem.main.repository.DTO.authentication.RegisterNewUserDto;
import com.sisgem.main.service.AuthenticationService;
import com.sisgem.main.service.TokenService;



@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private AuthenticationService service;
    
    @PostMapping("/login")
    public String login (@RequestBody LoginRequest login){
        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(login.login(), login.senha());
        Authentication authenticate = this.authenticationManager.authenticate(usernamePasswordAuthenticationToken);

        var usuario = (Usuario) authenticate.getPrincipal();

        return tokenService.gerarToken(usuario);
    }

    @PostMapping("/register")
    public Boolean salvar(@RequestBody RegisterNewUserDto usuarioDto) {
        Usuario usuario = service.registerNewUser(usuarioDto);
        return  usuario != null;
    }
}

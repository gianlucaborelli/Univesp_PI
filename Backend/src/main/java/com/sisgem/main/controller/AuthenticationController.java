package com.sisgem.main.controller;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sisgem.main.entity.Usuario;
import com.sisgem.main.repository.DTO.authentication.LoginRequest;
import com.sisgem.main.service.TokenService;

import io.swagger.v3.oas.annotations.parameters.RequestBody;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private TokenService tokenService;
    
    @PostMapping("/login")
    public String login (@RequestBody LoginRequest login){
        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(login.login(), login.senha());
        Authentication authenticate = this.authenticationManager.authenticate(usernamePasswordAuthenticationToken);

        var usuario = (Usuario) authenticate.getPrincipal();

        return tokenService.gerarToken(usuario);
    }
}

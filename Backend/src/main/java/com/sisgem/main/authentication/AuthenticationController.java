package com.sisgem.main.authentication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sisgem.main.authentication.dto.LoginRequest;
import com.sisgem.main.authentication.dto.LoginResultDto;
import com.sisgem.main.authentication.dto.RegisterUserRequestDto;
import com.sisgem.main.configuration.security.TokenService;
import com.sisgem.main.user.User;

import jakarta.validation.Valid;

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
    public ResponseEntity<LoginResultDto> login (@RequestBody LoginRequest login){
        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(login.email(), login.password());
        Authentication authenticate = this.authenticationManager.authenticate(usernamePasswordAuthenticationToken);

        var user = (User) authenticate.getPrincipal();

        LoginResultDto result = new LoginResultDto(tokenService.gerarToken(user), "");

        return ResponseEntity.ok().body(result);
    }

    @PostMapping("/register")
    public ResponseEntity<Void> register(@RequestBody RegisterUserRequestDto newUser) {
        service.registerUser(newUser);

        return  ResponseEntity.noContent().build();
    }
}

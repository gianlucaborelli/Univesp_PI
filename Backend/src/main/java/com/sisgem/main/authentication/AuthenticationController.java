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
import com.sisgem.main.authentication.dto.RefreshTokenRequestDto;
import com.sisgem.main.authentication.dto.RefreshTokenResultDto;
import com.sisgem.main.authentication.dto.RegisterUserRequestDto;
import com.sisgem.main.configuration.security.TokenService;
import com.sisgem.main.infra.exceptions.RefreshTokenExpiredException;
import com.sisgem.main.infra.exceptions.RefreshTokenNotFoundException;
import com.sisgem.main.user.User;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private TokenService tokenService;
    @Autowired
    private RefreshTokenService refreshTokenService;
    @Autowired
    private AuthenticationService service;

    @PostMapping("/login")
    public ResponseEntity<LoginResultDto> login(@RequestBody LoginRequest login) {
        try {
            UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
                    login.email(), login.password());
            Authentication authenticate = this.authenticationManager.authenticate(usernamePasswordAuthenticationToken);

            var user = (User) authenticate.getPrincipal();

            LoginResultDto loginResult = LoginResultDto.builder()
                    .accessToken(tokenService.gerarToken(user))
                    .refreshToken(refreshTokenService.createRefreshToken(user.getEmail()))
                    .build();

            return ResponseEntity.ok().body(loginResult);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }

    }

    @PostMapping("/register")
    public ResponseEntity<Void> register(@RequestBody RegisterUserRequestDto newUser) {
        service.registerUser(newUser);

        return ResponseEntity.noContent().build();
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<RefreshTokenResultDto> register(@RequestBody RefreshTokenRequestDto refreshToken)
            throws RefreshTokenNotFoundException, RefreshTokenExpiredException {
        RefreshToken token = refreshTokenService.verifyRefresToken(refreshToken.getRefreshToken());
        
        RefreshTokenResultDto resultDto = RefreshTokenResultDto.builder()
                .accessToken(tokenService.gerarToken(token.getUser()))
                .refreshToken(refreshTokenService.createRefreshToken(token.getUser().getEmail()))
                .build();

        return ResponseEntity.ok().body(resultDto);
    }
}

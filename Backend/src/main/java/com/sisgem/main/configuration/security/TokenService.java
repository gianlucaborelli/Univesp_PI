package com.sisgem.main.configuration.security;

import java.time.Duration;
import java.time.Instant;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.sisgem.main.user.User;

@Service
public class TokenService {    
    @Value("${api.security.token.secret}")
    private String secret;

    private static long tokenExpire = 30;

    public String gerarToken(User usuario) {
        return JWT.create()
                .withIssuer("auth-api")
                .withSubject(usuario.getUsername())
                .withClaim("id", usuario.getId().toString())
                .withClaim("role", usuario.getAuthorities().toString())
                .withClaim("name", usuario.getName())                
                .withExpiresAt(Instant.now().plus(Duration.ofMinutes(tokenExpire)))
                .sign(Algorithm.HMAC256(secret));
    }

    public String getSubject(String token) {
        return JWT.require(Algorithm.HMAC256(secret))
                .withIssuer("auth-api")
                .build().verify(token).getSubject();
    }

    public String validateToken(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            return JWT.require(algorithm)
                    .withIssuer("auth-api")
                    .build()
                    .verify(token)
                    .getSubject();
        } catch (JWTVerificationException exception) {
            return "";
        }
    }
}

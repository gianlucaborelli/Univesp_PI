package com.sisgem.main.infra;

import java.io.IOException;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.ExceptionHandler;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response,
            AuthenticationException authException)
            throws IOException, ServletException {
        // 401
        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Authentication Failed");
    }

    @ExceptionHandler(value = { BadCredentialsException.class })
    public void commence(HttpServletRequest request, HttpServletResponse response,
            BadCredentialsException authException)
            throws IOException, ServletException {
        // 400
        response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Usuário ou senha inválidos");
    }

    @ExceptionHandler(value = { AccessDeniedException.class })
    public void commence(HttpServletRequest request, HttpServletResponse response,
            AccessDeniedException accessDeniedException) throws IOException {
        // 403
        response.sendError(HttpServletResponse.SC_FORBIDDEN,
                "Authorization Failed : " + accessDeniedException.getMessage());
    }    

    @ExceptionHandler(value = { Exception.class })
    public void commence(HttpServletRequest request, HttpServletResponse response,
            Exception exception) throws IOException {
        // 500
        response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR,
                "Internal Server Error : " + exception.getMessage());
    }
}
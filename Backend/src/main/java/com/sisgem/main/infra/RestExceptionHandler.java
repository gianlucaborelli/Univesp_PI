package com.sisgem.main.infra;

import java.time.Instant;

import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.sisgem.main.infra.exceptions.*;

@ControllerAdvice
public class RestExceptionHandler extends ResponseEntityExceptionHandler {

    // private static ProblemDetail asProblemDetail(Exception e, HttpStatus status) {
    //     ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(status,e.getMessage());
    //     problemDetail.setTitle("Bookmark Not Found");        
    //     problemDetail.setProperty("errorCategory", "Generic");
    //     problemDetail.setProperty("timestamp", Instant.now());
    //     return problemDetail;
    // }

    @ExceptionHandler(UserAlreadyExistException.class)    
    public ProblemDetail handleUserAlreadyExistException(UserAlreadyExistException e) {
        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.CONFLICT, e.getLocalizedMessage());
        problemDetail.setTitle("Usuário já cadastrado.");
        problemDetail.setDetail(e.getMessage());
        problemDetail.setProperty("Categoria", "Plataforma");
        problemDetail.setProperty("TimeStamp", Instant.now());
        return problemDetail;
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ProblemDetail handleUserNotFoundException(UserNotFoundException e) {
        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST, e.getLocalizedMessage());
        problemDetail.setTitle("Usuário não encontrado.");
        problemDetail.setDetail(e.getMessage());
        problemDetail.setProperty("Categoria", "Plataforma");
        problemDetail.setProperty("TimeStamp", Instant.now());
        return problemDetail;
    }
}
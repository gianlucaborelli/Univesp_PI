package com.sisgem.main.address.exceptions.handler;

import java.time.Instant;

import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.sisgem.main.address.exceptions.AddressNotFoundException;

@ControllerAdvice
public class AddressExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(AddressNotFoundException.class)    
    public ProblemDetail handleAddressNotFoundException(AddressNotFoundException e) {
        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, e.getLocalizedMessage());
        problemDetail.setTitle("Recurso não encontrado.");
        problemDetail.setDetail(e.getMessage());
        problemDetail.setProperty("Categoria", "Address");
        problemDetail.setProperty("TimeStamp", Instant.now());
        return problemDetail;
    }

}

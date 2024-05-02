package com.sisgem.main.cart.exceptions.handler;

import java.time.Instant;

import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.sisgem.main.cart.exceptions.AddressToShippingNotSetException;
import com.sisgem.main.cart.exceptions.CartNotFoundException;
import com.sisgem.main.cart.exceptions.InvalidDateRangeException;
import com.sisgem.main.cart.exceptions.UserCartNotFoundException;

@ControllerAdvice
public class CartExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(CartNotFoundException.class)    
    public ProblemDetail handleCartNotFoundException(CartNotFoundException e) {
        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, e.getLocalizedMessage());
        problemDetail.setTitle("Recurso não encontrado.");
        problemDetail.setDetail(e.getMessage());
        problemDetail.setProperty("Categoria", "Cart");
        problemDetail.setProperty("TimeStamp", Instant.now());
        return problemDetail;
    }

    @ExceptionHandler(UserCartNotFoundException.class)    
    public ProblemDetail handleUserCartNotFoundException(UserCartNotFoundException e) {
        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, e.getLocalizedMessage());
        problemDetail.setTitle("Recurso não encontrado.");
        problemDetail.setDetail(e.getMessage());
        problemDetail.setProperty("Categoria", "Cart");
        problemDetail.setProperty("TimeStamp", Instant.now());
        return problemDetail;
    }

    @ExceptionHandler(InvalidDateRangeException.class)
    public ProblemDetail handleInvalidDateRangeException(InvalidDateRangeException e) {
        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST, e.getLocalizedMessage());
        problemDetail.setTitle("Intervalo de datas inválido.");
        problemDetail.setDetail(e.getMessage());
        problemDetail.setProperty("Categoria", "Carrinho de Orçamento");
        problemDetail.setProperty("TimeStamp", Instant.now());
        return problemDetail;
    }

    @ExceptionHandler(AddressToShippingNotSetException.class)
    public ProblemDetail handleAddressToShippingNotSetException(AddressToShippingNotSetException e) {
        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST, e.getLocalizedMessage());
        problemDetail.setTitle("Sem endereço valido.");
        problemDetail.setDetail(e.getMessage());
        problemDetail.setProperty("Categoria", "Carrinho de Orçamento");
        problemDetail.setProperty("TimeStamp", Instant.now());
        return problemDetail;
    }
}

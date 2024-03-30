package com.sisgem.main.infra;

import java.time.Instant;

import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.sisgem.main.cart.exceptions.InvalidDateRangeException;
import com.sisgem.main.infra.exceptions.*;
import com.sisgem.main.product.exceptions.InsufficientStockException;
import com.sisgem.main.product.exceptions.ProductNotFoundException;

@ControllerAdvice
public class RestExceptionHandler extends ResponseEntityExceptionHandler {    

    @ExceptionHandler(ResourceNotFound.class)    
    public ProblemDetail handleUserAlreadyExistException(ResourceNotFound e) {
        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, e.getLocalizedMessage());
        problemDetail.setTitle("Recurso não encontrado.");
        problemDetail.setDetail(e.getMessage());
        problemDetail.setProperty("Categoria", "Recurso");
        problemDetail.setProperty("TimeStamp", Instant.now());
        return problemDetail;
    }

    @ExceptionHandler(UserAlreadyExistException.class)    
    public ProblemDetail handleUserAlreadyExistException(UserAlreadyExistException e) {
        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.CONFLICT, e.getLocalizedMessage());
        problemDetail.setTitle("Usuário já cadastrado.");
        problemDetail.setDetail(e.getMessage());
        problemDetail.setProperty("Categoria", "Autenticação");
        problemDetail.setProperty("TimeStamp", Instant.now());
        return problemDetail;
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ProblemDetail handleUserNotFoundException(UserNotFoundException e) {
        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST, e.getLocalizedMessage());
        problemDetail.setTitle("Usuário não encontrado.");
        problemDetail.setDetail(e.getMessage());
        problemDetail.setProperty("Categoria", "Usuário");
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

    @ExceptionHandler(ProductNotFoundException.class)
    public ProblemDetail handleProductNotFoundException(ProductNotFoundException e) {
        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, e.getLocalizedMessage());
        problemDetail.setTitle("Produto não encontrado.");
        problemDetail.setDetail(e.getMessage());
        problemDetail.setProperty("Categoria", "Produtos");
        problemDetail.setProperty("TimeStamp", Instant.now());
        return problemDetail;
    }

    @ExceptionHandler(InsufficientStockException.class)
    public ProblemDetail handleInsufficientStockException(InsufficientStockException e) {
        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST, e.getLocalizedMessage());
        problemDetail.setTitle("Estoque Insuficiente.");
        problemDetail.setDetail(e.getMessage());
        problemDetail.setProperty("Categoria", "Estoque");
        problemDetail.setProperty("TimeStamp", Instant.now());
        return problemDetail;
    }
}
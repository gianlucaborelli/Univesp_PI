package com.sisgem.main.infra;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.sisgem.main.infra.exceptions.ApiError;
import com.sisgem.main.infra.exceptions.BusinessException;
import com.sisgem.main.infra.exceptions.UserAlreadyExistException;

@RestControllerAdvice
public class ApplicationResourceAdvice {

    @ExceptionHandler(BusinessException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ApiError handleBusinessException(BusinessException exception) {
        return new ApiError(exception.getMessage());
    }

    @ExceptionHandler(UserAlreadyExistException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public ApiError handleUserAlreadyExistException(UserAlreadyExistException exception) {
        return new ApiError(exception.getMessage());
    }
}
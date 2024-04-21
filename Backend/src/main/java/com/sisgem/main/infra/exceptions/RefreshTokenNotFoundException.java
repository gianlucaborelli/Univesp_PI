package com.sisgem.main.infra.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.UNAUTHORIZED)
public class RefreshTokenNotFoundException extends Exception {
    private static final long serialVersionUID = 1L;

    public RefreshTokenNotFoundException(String message)  {
        super(message);
    }
}

package com.sisgem.main.infra.exceptions;

public class UserNotFoundException extends Exception {
    public UserNotFoundException(final String msg) {
        super(msg);
    }
}

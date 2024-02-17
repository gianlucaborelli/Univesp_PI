package com.sisgem.main.infra.exceptions;


public class BusinessException  extends  RuntimeException {
    public BusinessException(String message) {
        super(message);
    }
}
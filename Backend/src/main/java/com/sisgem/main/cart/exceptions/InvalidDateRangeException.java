package com.sisgem.main.cart.exceptions;

import java.util.Date;

public class InvalidDateRangeException extends RuntimeException {
    public InvalidDateRangeException(Date initialDate, Date finalDate) {
        super(String.format("A data inicial (%s) deve ser anterior a data final (%s)!", initialDate.toString(),
        finalDate.toString()));
    }
}

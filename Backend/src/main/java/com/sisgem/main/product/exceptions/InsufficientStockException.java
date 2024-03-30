package com.sisgem.main.product.exceptions;

public class InsufficientStockException extends RuntimeException {
    
    public InsufficientStockException(Integer requestedQuantity, String productName) {
        super(String.format("Insufficient stock for %d units of product %s.", requestedQuantity, productName));
    }
}

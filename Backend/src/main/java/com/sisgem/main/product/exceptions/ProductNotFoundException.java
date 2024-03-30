package com.sisgem.main.product.exceptions;

import java.util.UUID;

public class ProductNotFoundException extends RuntimeException {
    
    public ProductNotFoundException(UUID productId) {
        super(String.format("Product with ID %s not found.", productId.toString()));
    }
}
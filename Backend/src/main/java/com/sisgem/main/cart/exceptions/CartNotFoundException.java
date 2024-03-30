package com.sisgem.main.cart.exceptions;

import java.util.UUID;

public class CartNotFoundException extends RuntimeException {
    public CartNotFoundException(UUID cartId) {
        super(String.format("Carrinho com ID %s não encontrado.", cartId.toString()));
    }
}

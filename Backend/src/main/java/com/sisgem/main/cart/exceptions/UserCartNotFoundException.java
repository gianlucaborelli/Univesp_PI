package com.sisgem.main.cart.exceptions;

import java.util.UUID;

public class UserCartNotFoundException extends RuntimeException {
    public UserCartNotFoundException(UUID userId) {
        super(String.format("Carrinho do usuário %s não encontrado.", userId.toString()));
    }
}
package com.sisgem.main.cart.exceptions;

public class AddressToShippingNotSetException extends RuntimeException {
    public AddressToShippingNotSetException() {
        super(String.format("Endereço de entrega não definido no pedido."));
    }
}
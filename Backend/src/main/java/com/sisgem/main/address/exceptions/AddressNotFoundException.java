package com.sisgem.main.address.exceptions;

import java.util.UUID;

public class AddressNotFoundException extends RuntimeException {
    
    public AddressNotFoundException(UUID addressId) {
        super(String.format("Endereço com ID %s não encontrado.", addressId.toString()));
    }
}

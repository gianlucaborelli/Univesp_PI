package com.sisgem.main.address.dto;

import java.util.UUID;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddressDetailDto {
    private UUID id;
    
    private String zipCode;

    private String street;

    private String number; // pode existir endereços com númeração com letras exemplo casa 100A e casa 100B

    private String district;

    private String city;

    private String state;

    private String description;
    
    private UUID userId;
}

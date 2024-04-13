package com.sisgem.main.address.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddressAutoCompleteDto {
    private String zipCode;
    private String street;
    private String district;
    private String city;
    private String state;
}

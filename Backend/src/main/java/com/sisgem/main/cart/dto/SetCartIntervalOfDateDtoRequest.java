package com.sisgem.main.cart.dto;

import java.util.Date;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Setter
@Getter
public class SetCartIntervalOfDateDtoRequest { 
    private Date finalDate;
    private Date initialDate;
}

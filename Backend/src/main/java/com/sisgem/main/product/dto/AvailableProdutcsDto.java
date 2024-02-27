package com.sisgem.main.product.dto;

import java.math.BigDecimal;
import java.util.UUID;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AvailableProdutcsDto {
    
    private UUID id;

    private String name;

    private int stock;
    
    private BigDecimal price;    
}
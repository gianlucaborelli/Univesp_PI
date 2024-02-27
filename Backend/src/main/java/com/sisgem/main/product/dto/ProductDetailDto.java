package com.sisgem.main.product.dto;

import java.math.BigDecimal;
import java.util.UUID;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductDetailDto {
    private UUID id;    

    private String name;    

    private Integer stock;    

    private String description;

    private BigDecimal price;
}

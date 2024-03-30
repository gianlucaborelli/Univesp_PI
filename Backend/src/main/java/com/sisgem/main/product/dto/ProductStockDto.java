package com.sisgem.main.product.dto;

import java.math.BigDecimal;
import java.util.UUID;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Setter
@Getter
public class ProductStockDto {    
    
    private UUID id;
    private String name;
    private Integer stock;
    private BigDecimal price;
    private Integer adjustedStock;        
}

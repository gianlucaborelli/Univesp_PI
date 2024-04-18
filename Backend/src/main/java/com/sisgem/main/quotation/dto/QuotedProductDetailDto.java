package com.sisgem.main.quotation.dto;

import java.math.BigDecimal;
import java.util.UUID;

import com.sisgem.main.product.Product;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class QuotedProductDetailDto {    
    private UUID id;

    private Integer amount;

    private BigDecimal price;

    private Product product;   

    private UUID quotationId;  
}

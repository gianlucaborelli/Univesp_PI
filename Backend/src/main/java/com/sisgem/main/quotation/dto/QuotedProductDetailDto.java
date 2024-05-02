package com.sisgem.main.quotation.dto;

import java.math.BigDecimal;
import java.util.UUID;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class QuotedProductDetailDto {    
    private UUID id;

    private Integer amount;

    private UUID productId;

    private BigDecimal unitPrice;

    private String productName;

    private BigDecimal totalPrice; 

    private UUID quotationId;  
}

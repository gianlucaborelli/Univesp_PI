package com.sisgem.main.quotedProduct.dto;

import java.math.BigDecimal;
import java.util.UUID;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class addProdutoPedidoResponse {
    private UUID id;
    private Integer amount;
    private BigDecimal price;
    private Long productId; 
    private Long quotationId;    
}

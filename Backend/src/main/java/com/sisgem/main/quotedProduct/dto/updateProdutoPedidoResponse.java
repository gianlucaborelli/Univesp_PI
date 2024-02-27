package com.sisgem.main.quotedProduct.dto;

import java.math.BigDecimal;
import java.util.UUID;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class updateProdutoPedidoResponse {
    
    private UUID id;
    
    private Integer amount;
    
    private BigDecimal price;
    
    private UUID productId; 

    private UUID quotationId;
}

package com.sisgem.main.quotedProduct.dto;

import java.util.UUID;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class addProdutoPedidoRequest {
    
    private int amount;
    private UUID productId;
    private UUID quotationId;
}

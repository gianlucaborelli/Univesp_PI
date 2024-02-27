package com.sisgem.main.quotedProduct.dto;

import java.util.UUID;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class updateProdutoPedidoRequest {

    private UUID id;
    private int amount;
}

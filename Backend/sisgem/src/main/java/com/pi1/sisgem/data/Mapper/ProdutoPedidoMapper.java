package com.pi1.sisgem.data.Mapper;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import com.pi1.sisgem.data.DTO.produtosPedidos.addProdutoPedidoResponse;
import com.pi1.sisgem.entity.ProdutoPedido;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class ProdutoPedidoMapper {
    private final ModelMapper mapper;
    
    public addProdutoPedidoResponse toAddProdutoPedidoResponse (ProdutoPedido produtoPedido){
        return mapper.map(produtoPedido, addProdutoPedidoResponse.class);
    }
}

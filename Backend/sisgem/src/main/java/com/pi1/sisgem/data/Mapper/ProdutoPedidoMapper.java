package com.pi1.sisgem.data.Mapper;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import com.pi1.sisgem.data.DTO.produtosPedidos.produtoPedidoExisteDTO;
import com.pi1.sisgem.data.DTO.produtosPedidos.updateProdutoPedidoResponse;
import com.pi1.sisgem.entity.ProdutoPedido;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class ProdutoPedidoMapper {

    private final ModelMapper mapper;
    
    public updateProdutoPedidoResponse toUpdateProdutoPedidoResponse(ProdutoPedido produto) {
        updateProdutoPedidoResponse response = mapper.map(produto, updateProdutoPedidoResponse.class);
        response.setProdutoId(produto.getProduto().getId());
        response.setOrcamentoId(produto.getOrcamento().getId());
        return response;
    }

    public produtoPedidoExisteDTO toProdutoPedidoExiste(ProdutoPedido produto) {
        produtoPedidoExisteDTO response = mapper.map(produto, produtoPedidoExisteDTO.class);
        response.setProdutoId(produto.getProduto().getId());
        response.setOrcamentoId(produto.getOrcamento().getId());
        return response;
    }
}

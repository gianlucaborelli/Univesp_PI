package com.sisgem.main.repository.Mapper;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import com.sisgem.main.entity.ProdutoPedido;
import com.sisgem.main.repository.DTO.produtosPedidos.produtoPedidoExisteDTO;
import com.sisgem.main.repository.DTO.produtosPedidos.updateProdutoPedidoResponse;

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

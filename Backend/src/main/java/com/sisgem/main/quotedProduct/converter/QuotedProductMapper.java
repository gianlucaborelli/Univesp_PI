package com.sisgem.main.quotedProduct.converter;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import com.sisgem.main.quotedProduct.QuotedProduct;
import com.sisgem.main.quotedProduct.dto.produtoPedidoExisteDTO;
import com.sisgem.main.quotedProduct.dto.updateProdutoPedidoResponse;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class QuotedProductMapper {

    private final ModelMapper mapper;
    
    public updateProdutoPedidoResponse toUpdateProdutoPedidoResponse(QuotedProduct produto) {
        updateProdutoPedidoResponse response = mapper.map(produto, updateProdutoPedidoResponse.class);
        response.setProductId(produto.getProduct().getId());
        response.setQuotationId(produto.getQuotation().getId());
        return response;
    }

    public produtoPedidoExisteDTO toProdutoPedidoExiste(QuotedProduct produto) {
        produtoPedidoExisteDTO response = mapper.map(produto, produtoPedidoExisteDTO.class);
        response.setProductId(produto.getProduct().getId());
        response.setQuotationId(produto.getQuotation().getId());
        return response;
    }
}

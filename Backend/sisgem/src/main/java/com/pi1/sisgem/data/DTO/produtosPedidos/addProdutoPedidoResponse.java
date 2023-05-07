package com.pi1.sisgem.data.DTO.produtosPedidos;

import java.math.BigDecimal;

public class addProdutoPedidoResponse {
    private Long id;
    private Integer quantidade;
    private BigDecimal preco;
    private Long produtoId; 
    private Long orcamentoId;

    private addProdutoPedidoResponse (){
    }

    // private addProdutoPedidoResponse (ProdutoPedido pedido){
    //     this.id = pedido.getId();
    //     this.quantidade = pedido.getQuantidade();
    //     this.orcamentoId = pedido.getOrcamentoId();
    //     this.produtoId = pedido.getProdutoId();
    // }

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public Integer getQuantidade() {
        return quantidade;
    }
    public void setQuantidade(Integer quantidade) {
        this.quantidade = quantidade;
    }
    public BigDecimal getPreco() {
        return preco;
    }
    public void setPreco(BigDecimal preco) {
        this.preco = preco;
    }
    public Long getProdutoId() {
        return produtoId;
    }
    public void setProdutoId(Long produtoId) {
        this.produtoId = produtoId;
    }
    public Long getOrcamentoId() {
        return orcamentoId;
    }
    public void setOrcamentoId(Long orcamentoId) {
        this.orcamentoId = orcamentoId;
    }   
}

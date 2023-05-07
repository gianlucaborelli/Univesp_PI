package com.pi1.sisgem.data.DTO.produtosPedidos;

public class addProdutoPedidoRequest {
    
    private int quantidade;
    private Long produtoId;
    private Long orcamentoId;
    
    public int getQuantidade() {
        return quantidade;
    }
    public void setQuantidade(int quantidade) {
        this.quantidade = quantidade;
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

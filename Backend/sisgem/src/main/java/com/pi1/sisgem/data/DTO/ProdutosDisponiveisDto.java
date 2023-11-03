package com.pi1.sisgem.data.DTO;

import java.math.BigDecimal;
public class ProdutosDisponiveisDto {
    
    private Long id;

    private String name;

    private int estoque;
    
    private BigDecimal precos;

    public BigDecimal getPrecos() {
        return precos;
    }

    public void setPrecos(BigDecimal precos) {
        this.precos = precos;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getEstoque() {
        return estoque;
    }

    public void setEstoque(int estoque) {
        this.estoque = estoque;
    }    
}

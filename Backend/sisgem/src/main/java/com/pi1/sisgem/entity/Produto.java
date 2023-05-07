package com.pi1.sisgem.entity;

import java.io.Serializable;
import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Produto {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;    

    @Column(nullable = false)
    private String name;    

    @Column
    private Integer Estoque;    

    @Column(nullable = true)
    private String Descricao;

    @Column(nullable = false)
    private BigDecimal precos;

    public BigDecimal getPrecos() {
        return precos;
    }

    public void setPrecos(BigDecimal precos) {
        this.precos = precos;
    }

    public void setDescricao(String descricao) {
        Descricao = descricao;
    }

    public String getDescricao() {
        return Descricao;
    }

    public void setEstoque(Integer estoque) {
        Estoque = estoque;
    }

    public Integer getEstoque() {
        return Estoque;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setId(Long id) {        
        this.id = id;
    }

    public Long getId() {
        return id;
    }
    
}

package com.pi1.sisgem.entity;

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

    public void setId(Long id) {        
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    @Column(nullable = false)
    private String name;

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    @Column
    private Integer Estoque;

    public void setEstoque(Integer estoque) {
        Estoque = estoque;
    }

    public Integer getEstoque() {
        return Estoque;
    }

    @Column(nullable = true)
    private String Descricao;

    public void setDescricao(String descricao) {
        Descricao = descricao;
    }

    public String getDescricao() {
        return Descricao;
    }

    
}

package com.pi1.sisgem.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

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

    @OneToMany(mappedBy = "produto")
    private List<Preco> precos = new ArrayList<>();

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

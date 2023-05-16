package com.pi1.sisgem.entity;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;

@Entity
public class Cliente  {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String obs;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn( name = "fk_cliente_id", referencedColumnName = "id")    
    @JsonManagedReference
    private List<Endereco> enderecos = new ArrayList<>();

    // @OneToMany(cascade = CascadeType.ALL)
    // @JoinColumn( name = "fk_cliente_id", referencedColumnName = "id")   
    // @JsonManagedReference 
    // private List<Orcamento> orcamentos = new ArrayList<>();

    // public List<Orcamento> getOrcamentos() {
    //     return orcamentos;
    // }

    // public void setOrcamentos(List<Orcamento> orcamentos) {
    //     this.orcamentos.addAll(orcamentos);
    // }

    public void setEnderecos(List<Endereco> enderecos) {
        this.enderecos.addAll(enderecos);
    }

    public List<Endereco> getEnderecos() {
        return enderecos;
    }

    public Long getId(){
        return id;
    }

    public void setId(Long id){
        this.id = id;
    }

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    public String getObs() {
        return obs;
    }
    public void setObs(String obs) {
        this.obs = obs;
    }

    
}

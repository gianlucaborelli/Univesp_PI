package com.pi1.sisgem.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pi1.sisgem.data.EnderecoRepositorio;
import com.pi1.sisgem.entity.Endereco;

@RestController
@RequestMapping("/enderecos")
public class EnderecoController {
    @Autowired
    private EnderecoRepositorio repositorio;

    @GetMapping
    public List<Endereco> listar(){
        return repositorio.findAll();
    }

    @PostMapping
    public void salvar(@RequestBody Endereco produto){
        repositorio.save(produto);
    }

    @PutMapping
    public void alterar(@RequestBody Endereco produto){
        if(produto.getId() > 0)
            repositorio.save(produto);
    }

    @DeleteMapping("/{id}")
    public void excluir(@PathVariable Long id){
        repositorio.deleteById(id);
    }    
}

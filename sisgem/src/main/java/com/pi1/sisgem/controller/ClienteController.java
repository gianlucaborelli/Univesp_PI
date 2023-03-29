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

import com.pi1.sisgem.data.ClienteRepositorio;
import com.pi1.sisgem.entity.Cliente;

@RestController
@RequestMapping("/clientes")
public class ClienteController {

    @Autowired
    private ClienteRepositorio repositorio;

    @GetMapping
    public List<Cliente> listar(){
        return repositorio.findAll();
    }

    @PostMapping
    public void salvar(@RequestBody Cliente contato){
        repositorio.save(contato);
    }

    @PutMapping
    public void alterar(@RequestBody Cliente contato){
        if(contato.getId() > 0)
            repositorio.save(contato);
    }

    @DeleteMapping("/{id}")
    public void excluir(@PathVariable Long id){
        repositorio.deleteById(id);
    }    
}

package com.pi1.sisgem.controller;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pi1.sisgem.data.OrcamentoRepositorio;
import com.pi1.sisgem.entity.Orcamento;

@RestController
@RequestMapping("/orcamentos")
public class OncamentoController {
    
    @Autowired
    private OrcamentoRepositorio repositorio;

    @GetMapping
    public List<Orcamento> listar(){        
        return repositorio.findAll();
    }

    @GetMapping("/{id}")
    public Orcamento listar(@PathVariable Long id){        
        return repositorio.findById(id).get();
    }

    @GetMapping("/intervaloDeDatas")
    public List<Orcamento> buscarPorIntervaloDeDatas(@RequestParam("dataInicio") Date dataInicio,
                                                      @RequestParam("dataFim") Date dataFim) {
        return repositorio.findByIntervaloDeDatas(dataInicio, dataFim);
    }

    @GetMapping("/cliente/{id}")
    public List<Orcamento> listarPorCliente(@PathVariable Long id){        
        return repositorio.findAllByClienteId(id);
    }

    @PostMapping
    public void salvar(@RequestBody Orcamento produto){
        repositorio.save(produto);
    }

    @PutMapping
    public void alterar(@RequestBody Orcamento produto){
        if(produto.getId() > 0)
            repositorio.save(produto);
    }

    @DeleteMapping("/{id}")
    public void excluir(@PathVariable Long id){
        repositorio.deleteById(id);
    }     
}

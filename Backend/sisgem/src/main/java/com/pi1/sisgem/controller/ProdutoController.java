package com.pi1.sisgem.controller;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pi1.sisgem.Service.ProdutoService;
import com.pi1.sisgem.data.ProdutoRepositorio;
import com.pi1.sisgem.data.DTO.ProdutosDisponiveisDto;
import com.pi1.sisgem.entity.Produto;

@RestController
@RequestMapping("/produtos")
public class ProdutoController {
    
    @Autowired
    private ProdutoRepositorio repositorio;

    @Autowired
    private ProdutoService service;

    @GetMapping
    public List<Produto> listar(){        
        return repositorio.findAll();
    }

    @GetMapping("/findByName")
    public ResponseEntity<List<Produto>> findbyName(@RequestParam("name") String name){
        return new ResponseEntity<List<Produto>>(repositorio.findByNameContaining(name), HttpStatus.OK ) ;
    }

    @GetMapping("/produtosDisponiveis")
    public ResponseEntity<List<ProdutosDisponiveisDto>> getProdutosDisponiveis(@RequestParam("dataInicio") Date dataInicio,
                                                                               @RequestParam("dataFinal") Date dataFinal){
        return new ResponseEntity<List<ProdutosDisponiveisDto>>(service.produtosDisponiveis(dataInicio, dataFinal), HttpStatus.OK ) ;
    }

    @PostMapping
    public void salvar(@RequestBody Produto produto){
        repositorio.save(produto);
    }

    @PutMapping
    public void alterar(@RequestBody Produto produto){
        if(produto.getId() > 0)
            repositorio.save(produto);
    }

    @DeleteMapping("/{id}")
    public void excluir(@PathVariable Long id){
        repositorio.deleteById(id);
    }      
}

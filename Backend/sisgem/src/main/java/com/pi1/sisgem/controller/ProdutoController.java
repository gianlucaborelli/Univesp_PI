package com.pi1.sisgem.controller;

import java.util.Date;
import java.util.List;
import java.util.Optional;

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

import com.pi1.sisgem.data.ProdutoRepositorio;
import com.pi1.sisgem.data.DTO.ProdutosDisponiveisDto;
import com.pi1.sisgem.entity.Produto;
import com.pi1.sisgem.service.ProdutoService;

@RestController
@RequestMapping("/produtos")
public class ProdutoController {

    @Autowired
    private ProdutoRepositorio repositorio;

    @Autowired
    private ProdutoService service;

    @GetMapping
    public List<Produto> listar() {
        return repositorio.findAll();
    }

    @GetMapping("/findByName")
    public ResponseEntity<List<Produto>> findbyName(@RequestParam("name") String name) {
        return new ResponseEntity<List<Produto>>(repositorio.findByNameContaining(name), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public Optional<Produto> findById(@PathVariable Long id) {
        return repositorio.findById(id);
    }

    @GetMapping("/produtosDisponiveis")
    public ResponseEntity<List<ProdutosDisponiveisDto>> getProdutosDisponiveis(
            @RequestParam("dataInicio") Date dataInicio,
            @RequestParam("dataFinal") Date dataFinal) {
        return new ResponseEntity<List<ProdutosDisponiveisDto>>(service.getProdutosDisponiveis(dataInicio, dataFinal),
                HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Produto> salvar(@RequestBody Produto produto) {
        Produto produtosalvo = repositorio.save(produto);
        return new ResponseEntity<>(produtosalvo, HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<Produto> alterar(@RequestBody Produto produto) {
        Produto produtoSalvo = new Produto();
        if (produto.getId() > 0) {
            produtoSalvo = repositorio.save(produto);
        }

        return new ResponseEntity<>(produtoSalvo, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public void excluir(@PathVariable Long id) {
        repositorio.deleteById(id);
    }
}

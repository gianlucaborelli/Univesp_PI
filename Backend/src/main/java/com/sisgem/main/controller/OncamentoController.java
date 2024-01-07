package com.sisgem.main.controller;

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

import com.sisgem.main.entity.Orcamento;
import com.sisgem.main.repository.OrcamentoRepositorio;

@RestController
@RequestMapping("/orcamentos")
public class OncamentoController {

    @Autowired
    private OrcamentoRepositorio repositorio;

    @GetMapping
    public List<Orcamento> listar() {
        return repositorio.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Orcamento>> listar(@PathVariable Long id) {

        return ResponseEntity.ok(repositorio.findById(id));
    }

    @GetMapping("/intervaloDeDatas")
    public List<Orcamento> buscarPorIntervaloDeDatas(@RequestParam("dataInicio") Date dataInicio,
            @RequestParam("dataFim") Date dataFim) {
        return repositorio.findByIntervaloDeDatas(dataInicio, dataFim);
    }

    @GetMapping("/cliente/{id}")
    public List<Orcamento> listarPorCliente(@PathVariable Long id) {
        return repositorio.findAllByClienteId(id);
    }

    @PostMapping
    public ResponseEntity<Orcamento> salvar(@RequestBody Orcamento orcamento) {        
        Orcamento orcamentoSalvo = repositorio.save(orcamento);
        return new ResponseEntity<>(orcamentoSalvo, HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<Orcamento> alterar(@RequestBody Orcamento orcamento) {
        Orcamento orcamentoSalvo = new Orcamento();
        if (orcamento.getId() > 0) {
            orcamentoSalvo = repositorio.save(orcamento);
        }

        return new ResponseEntity<>(orcamentoSalvo, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public void excluir(@PathVariable Long id) {
        repositorio.deleteById(id);
    }
}

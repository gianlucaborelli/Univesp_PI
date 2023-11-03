package com.pi1.sisgem.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pi1.sisgem.data.ClienteRepositorio;
import com.pi1.sisgem.entity.Cliente;

@RestController
@RequestMapping("/clientes")
public class ClienteController {

    @Autowired
    private ClienteRepositorio repositorio;

    @CrossOrigin(origins = "http://localhost:8080")
    @GetMapping
    public List<Cliente> listar() {
        return repositorio.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Cliente> findById(@PathVariable Long id) {
        return repositorio.findById(id);
    }

    @GetMapping("/findByName")
    public ResponseEntity<List<Cliente>> findbyName(@RequestParam("name") String name) {
        return new ResponseEntity<List<Cliente>>(repositorio.findByNameContaining(name), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Cliente> salvar(@RequestBody Cliente cliente) {
        Cliente clienteSalvo = repositorio.save(cliente);
        return new ResponseEntity<>(clienteSalvo, HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<Cliente> alterar(@RequestBody Cliente cliente) {
        Cliente clienteSalvo = new Cliente();
        if (cliente.getId() > 0) {
            clienteSalvo = repositorio.save(cliente);
        }
        return new ResponseEntity<>(clienteSalvo, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public void excluir(@PathVariable Long id) {
        repositorio.deleteById(id);
    }
}

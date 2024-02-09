package com.sisgem.main.controller;

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

import com.sisgem.main.entity.Usuario;
import com.sisgem.main.repository.UsuarioRepositorio;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioRepositorio repositorio;

    @CrossOrigin(origins = "http://localhost:8080")
    @GetMapping
    public List<Usuario> listar() {
        return repositorio.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Usuario> findById(@PathVariable Long id) {
        return repositorio.findById(id);
    }

    @GetMapping("/findByName")
    public ResponseEntity<List<Usuario>> findbyName(@RequestParam("name") String name) {
        return new ResponseEntity<List<Usuario>>(repositorio.findByNameContaining(name), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Usuario> salvar(@RequestBody Usuario cliente) {
        Usuario clienteSalvo = repositorio.save(cliente);
        return new ResponseEntity<>(clienteSalvo, HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<Usuario> alterar(@RequestBody Usuario cliente) {
        Usuario clienteSalvo = new Usuario();
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

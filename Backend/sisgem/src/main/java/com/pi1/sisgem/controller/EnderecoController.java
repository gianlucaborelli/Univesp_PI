package com.pi1.sisgem.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pi1.sisgem.data.ClienteRepositorio;
import com.pi1.sisgem.data.EnderecoRepositorio;
import com.pi1.sisgem.entity.Cliente;
import com.pi1.sisgem.entity.Endereco;

@RestController
@RequestMapping("/enderecos")
public class EnderecoController {
    @Autowired
    private EnderecoRepositorio repositorio;
    @Autowired
    private ClienteRepositorio clienteRepository;

    @GetMapping
    public List<Endereco> listar() {
        return repositorio.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Endereco> findById(@PathVariable Long id) {
        return repositorio.findById(id);
    }

    @GetMapping("/{cep}")
    public Optional<Endereco> consultaPorCep(@PathVariable String cep) {
        return repositorio.findById(id);
    }

    @PostMapping
    public ResponseEntity<Endereco> salvar(@RequestBody Endereco endereco) {
        Long clienteId = endereco.getClienteId();
        Cliente cliente = clienteRepository.findById(clienteId).orElse(null);

        if (cliente == null) {
            return ResponseEntity.badRequest().build();
        }

        endereco.setCliente(cliente);
        Endereco novoEndereco = repositorio.save(endereco);

        return ResponseEntity.ok(novoEndereco);
    }

    @PutMapping
    public void alterar(@RequestBody Endereco endereco) {
        if (endereco.getId() > 0)
            repositorio.save(endereco);
    }

    @DeleteMapping("/{id}")
    public void excluir(@PathVariable Long id) {
        repositorio.deleteById(id);
    }
}

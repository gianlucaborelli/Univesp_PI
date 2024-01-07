package com.sisgem.main.controller;

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
import org.springframework.web.bind.annotation.RestController;

import com.sisgem.main.entity.Cliente;
import com.sisgem.main.entity.Endereco;
import com.sisgem.main.exception.ResourceNotFound;
import com.sisgem.main.repository.ClienteRepositorio;
import com.sisgem.main.repository.EnderecoRepositorio;
import com.sisgem.main.repository.DTO.enderecos.autoCompleteEnderecoResponse;
import com.sisgem.main.service.EnderecoService;

@RestController
@RequestMapping("/enderecos")
public class EnderecoController {
    @Autowired
    private EnderecoRepositorio repositorio;
    @Autowired
    private ClienteRepositorio clienteRepository;
    @Autowired
    private EnderecoService service;

    @GetMapping
    public List<Endereco> listar() {
        return repositorio.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Endereco> findById(@PathVariable Long id) {
        return repositorio.findById(id);
    }    

    @GetMapping("/cliente/{id}")
    public ResponseEntity<List<Endereco>> findEnderecosByClienteID(@PathVariable Long id) {

        return new ResponseEntity<List<Endereco>>(service.findEnderecosByClienteID(id), HttpStatus.OK);
    }

    @GetMapping("/findByCep/{cep}")
    public ResponseEntity<autoCompleteEnderecoResponse> consultaPorCep(@PathVariable String cep)
            throws ResourceNotFound {

        cep = cep.replace("-", "");

        if (!cep.matches("\\d+") | cep.length() != 8) {
            throw new ResourceNotFound("CEP inválido", HttpStatus.BAD_REQUEST);
        }

        autoCompleteEnderecoResponse endereco = service.findByCep(cep);

        if (endereco.getLocalidade() == null || endereco.getUf() == null) {
            throw new ResourceNotFound("CEP não encontrado", HttpStatus.NOT_FOUND);
        }

        return ResponseEntity.ok(endereco);
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

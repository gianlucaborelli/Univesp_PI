package com.sisgem.main.controller;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sisgem.main.entity.ProdutoPedido;
import com.sisgem.main.repository.ProdutoPedidoRepositorio;
import com.sisgem.main.repository.DTO.produtosPedidos.addProdutoPedidoRequest;
import com.sisgem.main.repository.DTO.produtosPedidos.produtoPedidoExisteDTO;
import com.sisgem.main.repository.DTO.produtosPedidos.updateProdutoPedidoResponse;
import com.sisgem.main.service.ProdutoPedidoService;

@RestController
@RequestMapping("/produtoPedido")
public class ProdutoPedidoController {
    
    @Autowired
    private ProdutoPedidoService service;

    @Autowired
    private ProdutoPedidoRepositorio repositorio;

    @GetMapping
    public List<ProdutoPedido> findAll(){
        return repositorio.findAll();
    }

    @GetMapping("/orcamento={id}")
    public Optional<List<ProdutoPedido>> findByOrcamentoId(@PathVariable Long id) {
        return repositorio.findAllByOrcamento_Id(id);
    }

    @GetMapping("/produtoPedidoJaExiste")
    public ResponseEntity<produtoPedidoExisteDTO> checkIfWasProdutoPedido(
            @RequestParam("orcamentoId") Long orcamentoId,
            @RequestParam("produtoId") Long produtoId) {
                
        return service.checkIfWasProdutoPedidoInOrcamento(orcamentoId, produtoId);
    }

    @PostMapping
    public ResponseEntity<ProdutoPedido> salvar(@RequestBody addProdutoPedidoRequest pedidoRequest){
        return service.addProdutoPedido(pedidoRequest);
    }

    @PutMapping
    public ResponseEntity<updateProdutoPedidoResponse> atualizar(@RequestBody ProdutoPedido pedidoRequest){
        return service.updateProdutoPedido(pedidoRequest);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id){
        return service.deleteProdutoPedido(id);
    }    
}

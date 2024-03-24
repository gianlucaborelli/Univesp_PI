package com.sisgem.main.quotedProduct;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sisgem.main.infra.exceptions.ResourceNotFound;
import com.sisgem.main.quotedProduct.dto.addProdutoPedidoRequest;
import com.sisgem.main.quotedProduct.dto.produtoPedidoExisteDTO;
import com.sisgem.main.quotedProduct.dto.updateProdutoPedidoResponse;

@RestController
@RequestMapping("/produtoPedido")
public class QuotedProductController {
    
    @Autowired
    private QuotedProductService service;

    @Autowired
    private QuotedProductRepository repositorio;

    @GetMapping
    public List<QuotedProduct> findAll(){
        return repositorio.findAll();
    }

    @GetMapping("/orcamento={id}")
    public Optional<List<QuotedProduct>> findByOrcamentoId(@PathVariable UUID id) {
        return repositorio.findAllByQuotation_Id(id);
    }

    @GetMapping("/produtoPedidoJaExiste")
    public ResponseEntity<produtoPedidoExisteDTO> checkIfWasProdutoPedido(
            @NonNull @RequestParam("orcamentoId") UUID orcamentoId,
            @NonNull @RequestParam("produtoId") UUID produtoId) 
                throws ResourceNotFound {
                
        return service.checkIfWasProdutoPedidoInOrcamento(orcamentoId, produtoId);
    }

    @PostMapping
    public ResponseEntity<QuotedProduct> salvar(@RequestBody addProdutoPedidoRequest pedidoRequest) throws ResourceNotFound{
        return service.addProdutoPedido(pedidoRequest);
    }

    @PutMapping
    public ResponseEntity<updateProdutoPedidoResponse> atualizar(@RequestBody QuotedProduct pedidoRequest) throws ResourceNotFound{
        return service.updateProdutoPedido(pedidoRequest);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@NonNull @PathVariable UUID id) throws ResourceNotFound{
        return service.deleteProdutoPedido(id);
    }    
}

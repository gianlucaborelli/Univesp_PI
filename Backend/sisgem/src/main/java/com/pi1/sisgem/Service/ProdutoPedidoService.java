package com.pi1.sisgem.service;

import java.math.BigDecimal;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.pi1.sisgem.data.OrcamentoRepositorio;
import com.pi1.sisgem.data.ProdutoPedidoRepositorio;
import com.pi1.sisgem.data.ProdutoRepositorio;
import com.pi1.sisgem.data.DTO.produtosPedidos.addProdutoPedidoRequest;
import com.pi1.sisgem.data.DTO.produtosPedidos.produtoPedidoExisteDTO;
import com.pi1.sisgem.data.DTO.produtosPedidos.updateProdutoPedidoResponse;
import com.pi1.sisgem.data.Mapper.ProdutoPedidoMapper;
import com.pi1.sisgem.entity.Orcamento;
import com.pi1.sisgem.entity.Produto;
import com.pi1.sisgem.entity.ProdutoPedido;

import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;


@Service
public class ProdutoPedidoService {    
    @Autowired
    private OrcamentoRepositorio orcamentoRepositorio;
    @Autowired
    private ProdutoRepositorio produtoRepositorio;
    @Autowired
    private ProdutoService produtoService;
    @Autowired
    private ProdutoPedidoRepositorio produtoPedidoRepositorio;
    @Autowired
    private EntityManager entityManager;
    @Autowired
    private ProdutoPedidoMapper mapper;

    public ResponseEntity<ProdutoPedido> addProdutoPedido (addProdutoPedidoRequest addProduto){
        HttpHeaders headers = new HttpHeaders();

        try{
            Produto produto = produtoRepositorio.findById(addProduto.getProdutoId()).get();
            if (produto == null){
                throw new NoSuchElementException("Produto não encontrado");
            }
            Orcamento orcamento = orcamentoRepositorio.findById(addProduto.getOrcamentoId()).get();
            if (orcamento == null){
                throw new NoSuchElementException("Orçamento não encontrado");
            }                

            produtoService.estoqueDisponivel(orcamento.getDataInicio(), orcamento.getDataFim(), addProduto.getQuantidade(), produto.getId());
    
            entityManager.clear();

            ProdutoPedido pedido = new ProdutoPedido();
    
            pedido.setOrcamento(orcamento);
            pedido.setProduto(produto);
            pedido.setQuantidade(addProduto.getQuantidade());
            pedido.setPreco(BigDecimal.valueOf(addProduto.getQuantidade()).multiply(produto.getPrecos()));
    
            produtoPedidoRepositorio.save(pedido);
    
            entityManager.clear();
            
            headers.add("Resposta", "Adicionado com sucesso");            
            return ResponseEntity.ok().headers(headers).body(pedido);

        }catch(NoSuchElementException e){
            headers.add("Erro", e.getMessage());            
            return ResponseEntity.notFound().headers(headers).build();
        }catch(IllegalArgumentException e){
            headers.add("Erro", e.getMessage());            
            return ResponseEntity.badRequest().headers(headers).build();
        }catch(Exception e){
            headers.add("Erro", e.getMessage());            
            return ResponseEntity.internalServerError().headers(headers).build();
        }        
    }

    @Transactional
    public ResponseEntity<updateProdutoPedidoResponse> updateProdutoPedido (ProdutoPedido updatePedido){
        HttpHeaders headers = new HttpHeaders();

        try{
            ProdutoPedido pedido = produtoPedidoRepositorio.findById(updatePedido.getId()).get();
            if (pedido == null){
                throw new NoSuchElementException("Produto não encontrado");
            }     
            
            Orcamento orcamento = pedido.getOrcamento();
            Produto produto = pedido.getProduto();
    
            produtoService.estoqueDisponivel(orcamento.getDataInicio(), orcamento.getDataFim(), updatePedido.getQuantidade(), produto.getId());
                
            pedido.setQuantidade(updatePedido.getQuantidade());
            pedido.setPreco(BigDecimal.valueOf(updatePedido.getQuantidade()).multiply(produto.getPrecos()));
    
            produtoPedidoRepositorio.save(pedido);
            
            updateProdutoPedidoResponse update = mapper.toUpdateProdutoPedidoResponse(pedido);
            
            headers.add("Resposta", "Atualizado com sucesso");            
            return ResponseEntity.ok().headers(headers).body(update);
        }catch(NoSuchElementException e){
            headers.add("Erro", e.getMessage());            
            return ResponseEntity.notFound().headers(headers).build();
        }catch(IllegalArgumentException e){
            headers.add("Erro", e.getMessage());            
            return ResponseEntity.badRequest().headers(headers).build();
        }catch(Exception e){
            headers.add("Erro", e.getMessage());            
            return ResponseEntity.internalServerError().headers(headers).build();
        }        
    }

    public ResponseEntity<produtoPedidoExisteDTO> checkIfWasProdutoPedidoInOrcamento (Long orcamentoId, Long produtoId){
        Optional<Orcamento> orcamentoOptional = orcamentoRepositorio.findById(orcamentoId);

        if (orcamentoOptional.isPresent()) {
            Orcamento orcamento = orcamentoOptional.get();        
            for (ProdutoPedido produto : orcamento.getProdutoPedidos()) {
                Produto produtoExistente = produto.getProduto();
                if (produtoExistente.getId() == produtoId) {
                    produtoPedidoExisteDTO update = mapper.toProdutoPedidoExiste(produto);
                    return new ResponseEntity<produtoPedidoExisteDTO>(update, HttpStatus.OK);
                }
            }
        }
    
        return new ResponseEntity<produtoPedidoExisteDTO>(new produtoPedidoExisteDTO(), HttpStatus.OK);
    }

    public ResponseEntity<Void> deleteProdutoPedido (Long id){
        HttpHeaders headers = new HttpHeaders();

        try{
            ProdutoPedido pedido = produtoPedidoRepositorio.findById(id).get();                  
            
            produtoPedidoRepositorio.delete(pedido);
    
            entityManager.clear();
    
            headers.add("Resposta","Deletado com sucesso");
            
            return ResponseEntity.ok().headers(headers).build();

        } catch (NoSuchElementException e){
            headers.add("Resposta","Pedido não encontrado");
            
            return ResponseEntity.notFound().headers(headers).build();
        }catch (Exception e){
            headers.add("Resposta","Algum erro interno aconteceu");
            
            return ResponseEntity.internalServerError().headers(headers).build();
        }        
    }
}

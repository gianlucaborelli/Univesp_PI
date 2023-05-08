package com.pi1.sisgem.service;

import java.math.BigDecimal;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.pi1.sisgem.data.OrcamentoRepositorio;
import com.pi1.sisgem.data.ProdutoPedidoRepositorio;
import com.pi1.sisgem.data.ProdutoRepositorio;
import com.pi1.sisgem.data.DTO.ProdutosDisponiveisDto;
import com.pi1.sisgem.data.DTO.produtosPedidos.addProdutoPedidoRequest;
import com.pi1.sisgem.data.DTO.produtosPedidos.addProdutoPedidoResponse;
import com.pi1.sisgem.data.Mapper.ProdutoPedidoMapper;
import com.pi1.sisgem.entity.Orcamento;
import com.pi1.sisgem.entity.Produto;
import com.pi1.sisgem.entity.ProdutoPedido;

import jakarta.persistence.EntityManager;

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
    private ProdutoPedidoMapper mapper;
    @Autowired
    private EntityManager entityManager;

    public ResponseEntity<addProdutoPedidoResponse> addProdutoPedido (addProdutoPedidoRequest addProduto){
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
    
            List<ProdutosDisponiveisDto> produtosDisponiveisList = produtoService.getProdutosDisponiveis(orcamento.getDataInicio(), orcamento.getDataFim());
            entityManager.clear();
    
            for (ProdutosDisponiveisDto produtoDisponivel : produtosDisponiveisList) {
                if (produtoDisponivel.getId() == produto.getId()){
    
                    if ((produtoDisponivel.getEstoque() - addProduto.getQuantidade()) < 0 ){
                        throw new IllegalArgumentException(String.format("Quantidade de %d unidades do produto %s, não disponivel em estoque.", 
                                                                                addProduto.getQuantidade(), produtoDisponivel.getName()));
                    }
                    break;
                }
            }
    
            ProdutoPedido pedido = new ProdutoPedido();
    
            pedido.setOrcamento(orcamento);
            pedido.setProduto(produto);
            pedido.setQuantidade(addProduto.getQuantidade());
            pedido.setPreco(BigDecimal.valueOf(addProduto.getQuantidade()).multiply(produto.getPrecos()));
    
            produtoPedidoRepositorio.save(pedido);
    
            entityManager.clear();
            
            headers.add("Resposta", "Adicionado com sucesso");            
            return ResponseEntity.ok().headers(headers).body(mapper.toAddProdutoPedidoResponse(pedido));
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

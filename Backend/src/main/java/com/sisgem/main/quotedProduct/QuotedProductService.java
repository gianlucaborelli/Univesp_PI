package com.sisgem.main.quotedProduct;

import java.math.BigDecimal;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.sisgem.main.product.Product;
import com.sisgem.main.product.ProductRepository;
import com.sisgem.main.product.ProductService;
import com.sisgem.main.quotation.QuotationRepository;
import com.sisgem.main.quotedProduct.converter.QuotedProductMapper;
import com.sisgem.main.quotedProduct.dto.addProdutoPedidoRequest;
import com.sisgem.main.quotedProduct.dto.produtoPedidoExisteDTO;
import com.sisgem.main.quotedProduct.dto.updateProdutoPedidoResponse;
import com.sisgem.main.quotation.Quotation;

import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;


@Service
public class QuotedProductService {    
    @Autowired
    private QuotationRepository orcamentoRepositorio;
    @Autowired
    private ProductRepository produtoRepositorio;
    @Autowired
    private ProductService produtoService;
    @Autowired
    private QuotedProductRepository produtoPedidoRepositorio;
    @Autowired
    private EntityManager entityManager;
    @Autowired
    private QuotedProductMapper mapper;

    public ResponseEntity<Optional<List<QuotedProduct>>> addProdutoPedido (UUID id){
        return ResponseEntity.ok().body(this.produtoPedidoRepositorio.findAllByQuotation_Id(id));
    }
    
    public ResponseEntity<QuotedProduct> addProdutoPedido (addProdutoPedidoRequest addProduto){
        HttpHeaders headers = new HttpHeaders();

        try{
            Product produto = produtoRepositorio.findById(addProduto.getProductId()).get();
            if (produto == null){
                throw new NoSuchElementException("Produto não encontrado");
            }
            Quotation orcamento = orcamentoRepositorio.findById(addProduto.getQuotationId()).get();
            if (orcamento == null){
                throw new NoSuchElementException("Orçamento não encontrado");
            }                

            produtoService.estoqueDisponivel(orcamento.getInitialDate(), orcamento.getFinalDate(), addProduto.getAmount(), produto.getId());
    
            entityManager.clear();

            QuotedProduct pedido = new QuotedProduct();
    
            pedido.setQuotation(orcamento);
            pedido.setProduct(produto);
            pedido.setAmount(addProduto.getAmount());
            pedido.setPrice(BigDecimal.valueOf(addProduto.getAmount()).multiply(produto.getPrice()));
    
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
    public ResponseEntity<updateProdutoPedidoResponse> updateProdutoPedido (QuotedProduct updatePedido){
        HttpHeaders headers = new HttpHeaders();

        try{
            QuotedProduct pedido = produtoPedidoRepositorio.findById(updatePedido.getId()).get();
            if (pedido == null){
                throw new NoSuchElementException("Produto não encontrado");
            }     
            
            Quotation orcamento = pedido.getQuotation();
            Product produto = pedido.getProduct();
    
            produtoService.estoqueDisponivel(orcamento.getInitialDate(), orcamento.getFinalDate(), updatePedido.getAmount(), produto.getId());
                
            pedido.setAmount(updatePedido.getAmount());
            pedido.setPrice(BigDecimal.valueOf(updatePedido.getAmount()).multiply(produto.getPrice()));
    
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

    public ResponseEntity<produtoPedidoExisteDTO> checkIfWasProdutoPedidoInOrcamento (UUID orcamentoId, UUID produtoId){
        Optional<Quotation> orcamentoOptional = orcamentoRepositorio.findById(orcamentoId);

        if (orcamentoOptional.isPresent()) {
            Quotation orcamento = orcamentoOptional.get();        
            for (QuotedProduct produto : orcamento.getQuotedProducts()) {
                Product produtoExistente = produto.getProduct();
                if (produtoExistente.getId() == produtoId) {
                    produtoPedidoExisteDTO update = mapper.toProdutoPedidoExiste(produto);
                    return new ResponseEntity<produtoPedidoExisteDTO>(update, HttpStatus.OK);
                }
            }
        }
    
        return new ResponseEntity<produtoPedidoExisteDTO>(new produtoPedidoExisteDTO(), HttpStatus.OK);
    }

    public ResponseEntity<Void> deleteProdutoPedido (UUID id){
        HttpHeaders headers = new HttpHeaders();

        try{
            QuotedProduct pedido = produtoPedidoRepositorio.findById(id).get();                  
            
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

package com.sisgem.main.product;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sisgem.main.product.converter.ProductMapper;
import com.sisgem.main.product.dto.AvailableProdutcsDto;
import com.sisgem.main.quotation.QuotationRepository;
import com.sisgem.main.quotedProduct.QuotedProduct;
import com.sisgem.main.quotation.Quotation;

import jakarta.persistence.EntityManager;

@Service
public class ProductService {
    
    @Autowired
    private ProductRepository repositorioProdutos;    
    @Autowired
    private QuotationRepository repositorioOrcamento;
    @Autowired
    private ProductMapper mapper;
    @Autowired
    private EntityManager entityManager;


    public List<AvailableProdutcsDto> getProdutosDisponiveis (Date initialDate, Date finalDate){
     
        var produtos = repositorioProdutos.findAll();

        var orcamentos = repositorioOrcamento.findByIntervalOfDates(initialDate, finalDate);
        
        for(Quotation orcamento : orcamentos){
            List<QuotedProduct> pedidos = orcamento.getQuotedProducts();

            for(QuotedProduct pedido : pedidos){
                Product produtoPedido = pedido.getProduct();

                for(Product produto: produtos){

                    if(produto.getId() == produtoPedido.getId()){
                        produto.setStock(produto.getStock() - pedido.getAmount());
                    }
                }
            }
        }
        entityManager.clear();
        return mapper.toAvailableProductList(produtos);
    }
    
    public Boolean estoqueDisponivel (Date inicio, Date fim, Integer quantidade, UUID id){
        var produtosDisponiveisList = getProdutosDisponiveis(inicio, fim);
        
        for (AvailableProdutcsDto produtoDisponivel : produtosDisponiveisList) {
            if (produtoDisponivel.getId() == id){

                if ((produtoDisponivel.getStock() - quantidade) < 0 ){
                    throw new IllegalArgumentException(String.format("Quantidade de %d unidades do produto %s, não disponivel em estoque.", 
                                                                    quantidade, produtoDisponivel.getName()));
                }
                break;
            }
        }

        entityManager.clear();
        return true;
    }
}

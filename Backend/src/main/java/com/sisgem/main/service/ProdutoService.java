package com.sisgem.main.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sisgem.main.entity.Orcamento;
import com.sisgem.main.entity.Produto;
import com.sisgem.main.entity.ProdutoPedido;
import com.sisgem.main.repository.OrcamentoRepositorio;
import com.sisgem.main.repository.ProdutoRepositorio;
import com.sisgem.main.repository.DTO.ProdutosDisponiveisDto;
import com.sisgem.main.repository.Mapper.ProdutoMapper;

import jakarta.persistence.EntityManager;

@Service
public class ProdutoService {
    
    @Autowired
    private ProdutoRepositorio repositorioProdutos;    
    @Autowired
    private OrcamentoRepositorio repositorioOrcamento;
    @Autowired
    private ProdutoMapper mapper;
    @Autowired
    private EntityManager entityManager;


    public List<ProdutosDisponiveisDto> getProdutosDisponiveis (Date inicio, Date fim){
     
        var produtos = repositorioProdutos.findAll();

        var orcamentos = repositorioOrcamento.findByIntervaloDeDatas(inicio, fim);
        
        for(Orcamento orcamento : orcamentos){
            List<ProdutoPedido> pedidos = orcamento.getProdutoPedidos();

            for(ProdutoPedido pedido : pedidos){
                Produto produtoPedido = pedido.getProduto();

                for(Produto produto: produtos){

                    if(produto.getId() == produtoPedido.getId()){
                        produto.setEstoque(produto.getEstoque() - pedido.getQuantidade());
                    }
                }
            }
        }
        entityManager.clear();
        return mapper.toProdutoDisponivelList(produtos);
    }
    
    public Boolean estoqueDisponivel (Date inicio, Date fim, Integer quantidade, Long id){
        var produtosDisponiveisList = getProdutosDisponiveis(inicio, fim);
        
        for (ProdutosDisponiveisDto produtoDisponivel : produtosDisponiveisList) {
            if (produtoDisponivel.getId() == id){

                if ((produtoDisponivel.getEstoque() - quantidade) < 0 ){
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

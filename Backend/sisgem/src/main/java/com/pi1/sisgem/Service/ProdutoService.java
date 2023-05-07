package com.pi1.sisgem.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pi1.sisgem.data.OrcamentoRepositorio;
import com.pi1.sisgem.data.ProdutoRepositorio;
import com.pi1.sisgem.data.DTO.ProdutosDisponiveisDto;
import com.pi1.sisgem.data.Mapper.ProdutoMapper;
import com.pi1.sisgem.entity.Orcamento;
import com.pi1.sisgem.entity.Produto;
import com.pi1.sisgem.entity.ProdutoPedido;

@Service
public class ProdutoService {
    
    @Autowired
    private ProdutoRepositorio repositorioProdutos;    
    @Autowired
    private OrcamentoRepositorio repositorioOrcamento;
    @Autowired
    private ProdutoMapper mapper;


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
        return mapper.toProdutoDisponivelList(produtos);
    }
    
}

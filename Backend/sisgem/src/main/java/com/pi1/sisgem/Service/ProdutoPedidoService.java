package com.pi1.sisgem.service;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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

    public addProdutoPedidoResponse addProdutoPedido (addProdutoPedidoRequest addProduto){

        Produto produto = produtoRepositorio.findById(addProduto.getProdutoId()).get();
        if (produto == null){
            throw new IllegalArgumentException("Produto não encontrado");
        }
        Orcamento orcamento = orcamentoRepositorio.findById(addProduto.getOrcamentoId()).get();
        if (orcamento == null){
            throw new IllegalArgumentException("Orçamento não encontrado");
        }

        List<ProdutosDisponiveisDto> produtosDisponiveisList = produtoService.getProdutosDisponiveis(orcamento.getDataInicio(), orcamento.getDataFim());
        entityManager.clear();

        for (ProdutosDisponiveisDto produtoDisponivel : produtosDisponiveisList) {
            if (produtoDisponivel.getId() == produto.getId()){

                if ((produtoDisponivel.getEstoque() - addProduto.getQuantidade()) < 0 ){
                    throw new IllegalArgumentException("Quantidade indisponivel em estoque");
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

        return mapper.toAddProdutoPedidoResponse(pedido);
    }

}

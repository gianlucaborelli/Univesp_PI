package com.Service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pi1.sisgem.data.OrcamentoRepositorio;
import com.pi1.sisgem.data.ProdutoRepositorio;
import com.pi1.sisgem.data.DTO.ProdutosDisponiveisDto;
import com.pi1.sisgem.data.Mapper.ProdutoMapper;

@Service
public class ProdutoService {
    
    @Autowired
    private ProdutoRepositorio repositorioProdutos;
    private ProdutoMapper mapper;

    @Autowired
    private OrcamentoRepositorio repositorioOrcamento;

    public List<ProdutosDisponiveisDto> produtosDisponiveis (Date inicio, Date fim){
     
        var produtos = repositorioProdutos.findAll();

        var orcamentos = repositorioOrcamento.findByIntervaloDeDatas(inicio, fim);

        if (orcamentos.isEmpty()){
            return null;
        }

        return mapper.toProdutoDisponivelList(produtos);
    }


}

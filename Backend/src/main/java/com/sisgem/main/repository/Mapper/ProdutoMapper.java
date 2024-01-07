package com.sisgem.main.repository.Mapper;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import com.sisgem.main.entity.Produto;
import com.sisgem.main.repository.DTO.ProdutosDisponiveisDto;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class ProdutoMapper {
    
    private final ModelMapper mapper;

    public ProdutosDisponiveisDto toProdutosDisponivel(Produto produto) {
        return mapper.map(produto, ProdutosDisponiveisDto.class);
    }

    public List<ProdutosDisponiveisDto> toProdutoDisponivelList(List<Produto> produtos) {
        return produtos.stream()
                .map(this::toProdutosDisponivel)
                .collect(Collectors.toList());
    }
}

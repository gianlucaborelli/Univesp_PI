package com.pi1.sisgem.data.Mapper;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import com.pi1.sisgem.data.DTO.ProdutosDisponiveisDto;
import com.pi1.sisgem.entity.Produto;

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

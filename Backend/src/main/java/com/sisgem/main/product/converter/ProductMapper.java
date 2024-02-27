package com.sisgem.main.product.converter;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import com.sisgem.main.product.Product;
import com.sisgem.main.product.dto.AvailableProdutcsDto;
import com.sisgem.main.product.dto.ProductDetailDto;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class ProductMapper {    
    private final ModelMapper mapper;

    public ProductDetailDto toProductDetail(Product product) {
        return mapper.map(product, ProductDetailDto.class);
    }

    public List<ProductDetailDto> toProductDetailList(List<Product> products) {
        return products.stream()
                .map(this::toProductDetail)
                .collect(Collectors.toList());
    }

    public AvailableProdutcsDto toAvailableProduct(Product product) {
        return mapper.map(product, AvailableProdutcsDto.class);
    }

    public List<AvailableProdutcsDto> toAvailableProductList(List<Product> products) {
        return products.stream()
                .map(this::toAvailableProduct)
                .collect(Collectors.toList());
    }
}

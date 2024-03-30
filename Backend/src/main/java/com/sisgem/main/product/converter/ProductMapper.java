package com.sisgem.main.product.converter;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import com.sisgem.main.product.Product;
import com.sisgem.main.product.dto.ProductDetailDto;
import com.sisgem.main.product.dto.ProductStockDto;

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

    public ProductStockDto toAvailableProduct(Product product) {
        return mapper.map(product, ProductStockDto.class);
    }

    public List<ProductStockDto> toAvailableProductStockList(List<Product> products) {
        return products.stream()
                .map(this::toAvailableProduct)
                .collect(Collectors.toList());
    }
}

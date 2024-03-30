package com.sisgem.main.cart.converter;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import com.sisgem.main.cart.Cart;
import com.sisgem.main.cart.dto.CartDetailDto;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class CartMapper {
    private final ModelMapper mapper;

    public CartDetailDto toCartDetail(Cart cart) {
        return mapper.map(cart, CartDetailDto.class);        
    } 

    public List<CartDetailDto> toCartDetailList(List<Cart> cartList) {
        return cartList.stream()
                .map(this::toCartDetail)
                .collect(Collectors.toList());
    }
}

package com.sisgem.main.cart;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.lang.NonNull;

import com.sisgem.main.cartItem.dto.AddCartItemDtoRequest;
import com.sisgem.main.cart.dto.CartDetailDto;
import com.sisgem.main.infra.exceptions.ResourceNotFound;

public interface CartService {

    public List<CartDetailDto> findAll();

    public CartDetailDto findByUserId(UUID userId) throws ResourceNotFound;

    public Cart findById(@NonNull UUID quotationCartId) throws ResourceNotFound;

    public CartDetailDto loadCartByUser(@NonNull UUID userId) throws ResourceNotFound;

    public void deleteCart(@NonNull UUID quotationCartId) throws ResourceNotFound;

    public CartDetailDto setShippingAddress(@NonNull UUID quotationId, @NonNull UUID addressId)
            throws ResourceNotFound;

    public CartDetailDto setIntervalOfDate(Date initialDate, Date finalDate,
            @NonNull UUID quotationCartId);

    public CartDetailDto addOrUpdateItemToCart(
            @NonNull UUID cartId, 
            AddCartItemDtoRequest request);

    public CartDetailDto deleteItemToCart(@NonNull UUID cartItemId, @NonNull UUID cartId);
}

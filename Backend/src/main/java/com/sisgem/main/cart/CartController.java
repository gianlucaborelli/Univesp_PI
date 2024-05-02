package com.sisgem.main.cart;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sisgem.main.cart.dto.CartDetailDto;
import com.sisgem.main.cart.dto.SetCartIntervalOfDateDtoRequest;
import com.sisgem.main.cartItem.dto.AddCartItemDtoRequest;
import com.sisgem.main.infra.exceptions.ResourceNotFound;

@RestController
@RequestMapping
public class CartController {

    @Autowired
    private CartService cartService;

    @GetMapping("/users/{userId}/cart")
    public CartDetailDto loadUserCart(
            @NonNull @PathVariable UUID userId) 
                throws ResourceNotFound {

        return cartService.loadCartByUser(userId);
    }    

    @PutMapping("/users/{userId}/cart/{cartId}/set-dates")
    public CartDetailDto setIntervalOfDateToCart(
            @NonNull @PathVariable UUID userId,
            @NonNull @PathVariable UUID cartId,
            @RequestBody SetCartIntervalOfDateDtoRequest request) 
                throws ResourceNotFound {

        return cartService.setIntervalOfDate(request.getInitialDate(), request.getFinalDate(),  cartId);
    }    

    @PutMapping("/users/{userId}/cart/{cartId}")
    public CartDetailDto addItemToCart(
            @NonNull @PathVariable UUID userId,
            @NonNull @PathVariable UUID cartId, 
            @RequestBody @NonNull AddCartItemDtoRequest request) 
                throws ResourceNotFound {

        return cartService.addOrUpdateItemToCart(cartId, request);
    } 

    @PutMapping("/users/{userId}/cart/{cartId}/finalizer")
    public boolean finalizerCart(
            @PathVariable UUID userId, 
            @PathVariable UUID cartId) throws ResourceNotFound{                                

        return cartService.finalizerCart(cartId);
    }

    @DeleteMapping("/users/{userId}/cart/{cartId}/item/{itemId}")
    public CartDetailDto deleteItemToCart(
            @NonNull @PathVariable UUID userId,
            @NonNull @PathVariable UUID cartId, 
            @NonNull @PathVariable UUID itemId) 
                throws ResourceNotFound {

        return cartService.deleteItemToCart(itemId, cartId);
    } 

    @PutMapping("/users/{userId}/cart/{cartId}/address/{addressId}")
    public CartDetailDto setShippingAddress(
            @NonNull @PathVariable UUID userId,
            @NonNull @PathVariable UUID cartId, 
            @NonNull @PathVariable UUID addressId) 
                throws ResourceNotFound {

        return cartService.setShippingAddress(cartId, addressId);
    } 
}

package com.sisgem.main.cart.repository;

import java.util.UUID;

import org.springframework.context.annotation.Scope;
import org.springframework.data.jpa.repository.JpaRepository;

import com.sisgem.main.cart.CartItem;

@Scope("request")
public interface CartItemRepository extends JpaRepository<CartItem, UUID>{    
}

package com.sisgem.main.cartItem;

import java.util.UUID;

import org.springframework.context.annotation.Scope;
import org.springframework.data.jpa.repository.JpaRepository;

@Scope("request")
public interface CartItemRepository extends JpaRepository<CartItem, UUID>{    
}

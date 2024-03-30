package com.sisgem.main.cart;

import java.util.Optional;
import java.util.UUID;

import org.springframework.context.annotation.Scope;
import org.springframework.data.jpa.repository.JpaRepository;

@Scope("prototype")
public interface CartRepository extends JpaRepository<Cart, UUID> { 
    Optional<Cart> findByUserId(UUID userId);
}

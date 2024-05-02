package com.sisgem.main.cart.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.context.annotation.Scope;
import org.springframework.data.jpa.repository.JpaRepository;

import com.sisgem.main.cart.Cart;
import com.sisgem.main.user.User;

@Scope("prototype")
public interface CartRepository extends JpaRepository<Cart, UUID> { 
    Optional<Cart> findByUserId(UUID userId);

    void deleteByUser(User user);
}

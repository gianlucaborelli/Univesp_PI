package com.sisgem.main.quotedProductCart;

import java.util.UUID;

import org.springframework.context.annotation.Scope;
import org.springframework.data.jpa.repository.JpaRepository;

@Scope("request")
public interface QuotedProductCartRepository extends JpaRepository<QuotedProductCart, UUID>{

    
}

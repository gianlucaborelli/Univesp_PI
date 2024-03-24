package com.sisgem.main.quotationCart;

import java.util.UUID;

import org.springframework.context.annotation.Scope;
import org.springframework.data.jpa.repository.JpaRepository;

@Scope("request")
public interface QuotationCartRepository extends JpaRepository<QuotationCart, UUID> { 
    
}

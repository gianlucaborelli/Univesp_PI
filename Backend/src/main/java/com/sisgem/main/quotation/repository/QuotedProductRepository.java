package com.sisgem.main.quotation.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.context.annotation.Scope;
import org.springframework.data.jpa.repository.JpaRepository;

import com.sisgem.main.quotation.util.QuotedProduct;

@Scope("request")
public interface QuotedProductRepository extends JpaRepository<QuotedProduct,UUID>{
    Optional<List<QuotedProduct>> findAllByQuotation_Id(UUID quotationId);
}

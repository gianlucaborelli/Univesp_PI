package com.sisgem.main.quotedProduct;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

public interface QuotedProductRepository extends JpaRepository<QuotedProduct,UUID>{
    Optional<List<QuotedProduct>> findAllByQuotation_Id(UUID quotationId);
}

package com.sisgem.main.quotation.repository;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.context.annotation.Scope;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.sisgem.main.quotation.Quotation;

@Scope("request")
public interface QuotationRepository extends JpaRepository<Quotation, UUID> {

    @Query("SELECT o FROM Quotation o WHERE o.initialDate BETWEEN :initialDate AND :finalDate OR o.finalDate BETWEEN :initialDate AND :finalDate")
    List<Quotation> findByIntervalOfDates(@Param("initialDate") Date initialDate, @Param("finalDate") Date finalDate);

    @Query("SELECT o FROM Quotation o WHERE o.user.id = :userId")
    List<Quotation> findAllByUserId(@Param("userId") UUID userId);

    @Query("SELECT o FROM Quotation o WHERE o.id = :quotationId AND o.user.id = :userId")
    Quotation findQuotationByUserId(@Param("quotationId") UUID quotationId, @Param("userId") UUID userId);
}

package com.sisgem.main.quotation.util;

import java.math.BigDecimal;
import java.util.UUID;

import com.sisgem.main.quotation.Quotation;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class QuotedProduct {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(nullable = false)
    private Integer amount;

    @Column(nullable = false)
    private UUID productId;

    @Column(nullable = false)
    private BigDecimal unitPrice;

    @Column(nullable = false)
    private String productName;

    @Column(nullable = false)
    private BigDecimal totalPrice;

    @ManyToOne
    @JoinColumn(name = "quotation_id", referencedColumnName = "id")
    private Quotation quotation;
}

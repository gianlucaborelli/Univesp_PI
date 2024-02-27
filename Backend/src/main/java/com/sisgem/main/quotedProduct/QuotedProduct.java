package com.sisgem.main.quotedProduct;

import java.math.BigDecimal;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.sisgem.main.product.Product;
import com.sisgem.main.quotation.Quotation;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class QuotedProduct {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(nullable = false)
    private Integer amount;

    @Column(nullable = false)
    private BigDecimal price;

    @ManyToOne 
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;    

    @ManyToOne
    @JoinColumn(name = "quotation_id")
    @JsonBackReference    
    private Quotation quotation;    
}

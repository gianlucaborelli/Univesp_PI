package com.sisgem.main.quotedProductCart;

import java.math.BigDecimal;
import java.util.UUID;



import com.fasterxml.jackson.annotation.JsonBackReference;
import com.sisgem.main.product.Product;
import com.sisgem.main.quotationCart.QuotationCart;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Table(name = "QUOTED_PRODUCT_CART")
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class QuotedProductCart {
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
    @JoinColumn(name = "quotationCart_id")
    @JsonBackReference    
    private QuotationCart quotationCart;   
}

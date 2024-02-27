package com.sisgem.main.product;

import java.math.BigDecimal;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Product {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;    

    @Column(nullable = false)
    private String name;    

    @Column
    private Integer stock;    

    @Column(nullable = true)
    private String description;

    @Column(nullable = false)
    private BigDecimal price;
}

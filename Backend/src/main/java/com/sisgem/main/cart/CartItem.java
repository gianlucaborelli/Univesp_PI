package com.sisgem.main.cart;

import java.math.BigDecimal;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.sisgem.main.product.Product;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "CART_ITEM")
public class CartItem {
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
    @JoinColumn(name = "cart_id")
    @JsonBackReference    
    private Cart cart;   

    public BigDecimal getPrice(){
        BigDecimal totalTemp = BigDecimal.ZERO;
        totalTemp = product.getPrice().multiply(BigDecimal.valueOf(amount));
        return totalTemp;
    }
}

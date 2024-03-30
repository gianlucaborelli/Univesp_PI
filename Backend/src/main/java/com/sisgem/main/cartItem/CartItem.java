package com.sisgem.main.cartItem;

import java.math.BigDecimal;
import java.util.UUID;



import com.fasterxml.jackson.annotation.JsonBackReference;
import com.sisgem.main.cart.Cart;
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
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Table(name = "CART_ITEM")
@NoArgsConstructor
@AllArgsConstructor
@Entity
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
}

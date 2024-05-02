package com.sisgem.main.cart;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.sisgem.main.address.Address;
import com.sisgem.main.cart.exceptions.InvalidDateRangeException;
import com.sisgem.main.user.User;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "CART")
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @JoinColumn(nullable = false, unique = true)
    @OneToOne
    private User user;

    @JoinColumn(nullable = true)
    @OneToOne
    private Address shippingAddress;

    @Column(nullable = true)
    private String shippingDescription;

    @Column(nullable = true)
    @Temporal(TemporalType.DATE)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy", locale = "pt-BR", timezone = "Brazil/East")
    private Date finalDate;

    @Column(nullable = true)
    @Temporal(TemporalType.DATE)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy", locale = "pt-BR", timezone = "Brazil/East")
    private Date initialDate;

    @Transient
    private BigDecimal totalPrice;

    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL)
    private List<CartItem> cartItens;

    public void addItemOnCart(CartItem item) {
        cartItens.add(item);
    }

    public BigDecimal getTotalPrice() {
        BigDecimal totalTemp = BigDecimal.ZERO;

        if(cartItens.isEmpty()){
            return totalTemp;
        }

        for (CartItem item : cartItens) {
            totalTemp = totalTemp.add(item.getPrice());
        }

        return totalTemp;
    }

    public void deleteAllCartItem() {
        cartItens.removeAll(cartItens);
    }

    public boolean isValid() {
        if (user == null || shippingAddress == null || cartItens.isEmpty() || !intervalOfDateIsValid()) {
            return false;
        }
        return true;
    }

    public void setIntervalOfDate(Date initialDate, Date finalDate) {
        validateIntervalOfDate(initialDate, finalDate);
        this.initialDate = initialDate;
        this.finalDate = finalDate;

    }

    public boolean intervalOfDateIsValid(){
        validateIntervalOfDate(initialDate, finalDate);
        return true;
    }

    private void validateIntervalOfDate(Date initialDate, Date finalDate) {
        if (initialDate.equals(null) || finalDate.equals(null)) {
            throw new InvalidDateRangeException();
        }

        if (initialDate.after(finalDate)) {
            throw new InvalidDateRangeException(initialDate, finalDate);
        }
    }
}

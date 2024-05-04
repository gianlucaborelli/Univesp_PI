package com.sisgem.main.quotation;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.sisgem.main.quotation.enums.QuotationStatusEnum;
import com.sisgem.main.quotation.util.QuotedProduct;
import com.sisgem.main.quotation.util.ShippingAddress;
import com.sisgem.main.user.User;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@Entity
@Table(name = "QUOTATION")
public class Quotation {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(nullable = false)
    @Temporal(TemporalType.DATE)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy", locale = "pt-BR", timezone = "Brazil/East")
    private Date finalDate;

    @Column(nullable = false)
    @Temporal(TemporalType.DATE)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy", locale = "pt-BR", timezone = "Brazil/East")
    private Date initialDate;

    @Transient
    private BigDecimal totalPrice;

    @ManyToOne(cascade = CascadeType.ALL)
    private User user;

    private QuotationStatusEnum status;

    @ManyToOne(cascade = CascadeType.ALL)
    private ShippingAddress shippingAddress;

    @OneToMany(mappedBy = "quotation", cascade = CascadeType.ALL)
    private List<QuotedProduct> quotedProducts;

    public void addQuotedProductList(List<QuotedProduct> quotedProductList) {   
        quotedProducts = new ArrayList<>();     
        quotedProductList.forEach(quotedProduct -> {
            quotedProduct.setQuotation(this);
            this.quotedProducts.add(quotedProduct);
        });
    }

    public BigDecimal getTotalPrice(){
       BigDecimal totalTemp = BigDecimal.ZERO;

        if(quotedProducts.isEmpty()){
            return totalTemp;
        }

        for (QuotedProduct item : quotedProducts) {
            totalTemp = totalTemp.add(item.getTotalPrice());
        }

        return totalTemp;
    }
}

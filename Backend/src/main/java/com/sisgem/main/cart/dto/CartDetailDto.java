package com.sisgem.main.cart.dto;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.sisgem.main.cartItem.CartItem;
import com.sisgem.main.address.dto.AddressDetailDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CartDetailDto {
    
    private UUID id;
    
    private UUID userId;
    
    private AddressDetailDto shippingAddress;
    
    private String shippingDescription;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy", locale = "pt-BR", timezone = "Brazil/East")
    private Date finalDate;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy", locale = "pt-BR", timezone = "Brazil/East")
    private Date initialDate;

    private List<CartItem> cartItens;
}

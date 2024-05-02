package com.sisgem.main.quotation.converter;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import com.sisgem.main.address.Address;
import com.sisgem.main.cart.Cart;
import com.sisgem.main.cart.CartItem;
import com.sisgem.main.quotation.Quotation;
import com.sisgem.main.quotation.dto.QuotationDetailDto;
import com.sisgem.main.quotation.enums.QuotationStatusEnum;
import com.sisgem.main.quotation.util.QuotedProduct;
import com.sisgem.main.quotation.util.ShippingAddress;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class QuotationMapper {
    private final ModelMapper mapper;

    public QuotationDetailDto toQuotationDetail(Quotation user) {
        return mapper.map(user, QuotationDetailDto.class);
    }

    public List<QuotationDetailDto> toQuotationDetailList(List<Quotation> users) {
        return users.stream()
                .map(this::toQuotationDetail)
                .collect(Collectors.toList());
    }

    public QuotedProduct CartItemToQuotedProduct(CartItem item){
        QuotedProduct product = QuotedProduct.builder()
                                    .productId(item.getProduct().getId())
                                    .productName(item.getProduct().getName())
                                    .unitPrice(item.getProduct().getPrice())
                                    .amount(item.getAmount())
                                    .totalPrice(item.getProduct().getPrice().multiply(BigDecimal.valueOf(item.getAmount())))
                                    .build();
        return product;
    }

    public List<QuotedProduct> CartItemListToQuotedProductList(List<CartItem> itens) {
        return itens.stream()
                .map(this::CartItemToQuotedProduct)
                .collect(Collectors.toList());
    }
    
    
    public ShippingAddress addressToShippingAddress(Address address){
        ShippingAddress shippingAddress = ShippingAddress.builder()
                                .zipCode(address.getZipCode())
                                .street(address.getStreet())
                                .number(address.getNumber())
                                .district(address.getDistrict())
                                .state(address.getState())
                                .city(address.getCity())
                                .description(address.getDescription())
                                .build();
        return shippingAddress;
    }

    public Quotation cartToQuotation(Cart cart){
        Quotation quotation = Quotation.builder()
                            .initialDate(cart.getInitialDate())
                            .finalDate(cart.getFinalDate())
                            .shippingAddress(addressToShippingAddress(cart.getShippingAddress()))
                            .user(cart.getUser())
                            .status(QuotationStatusEnum.PENDING)
                            .build();

        return quotation;
    }
}

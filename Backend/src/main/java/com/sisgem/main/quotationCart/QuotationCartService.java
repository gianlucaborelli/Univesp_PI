package com.sisgem.main.quotationCart;

import java.util.List;
import java.util.UUID;

import com.sisgem.main.quotation.dto.QuotationDetailDto;

public interface QuotationCartService {
    
    public List<QuotationDetailDto> findAll();

    public List<QuotationDetailDto> findAllByUserId(UUID userId);    

    public List<QuotationDetailDto> findById(UUID quotationCartId);

    public List<QuotationDetailDto> createNewQuotationCart(UUID userId);    

    public List<Void> deleteQuotationCart(UUID quotationCartId);

    public List<QuotationDetailDto> setShippingAddress();

    public List<QuotationDetailDto> addProductToCart();

    public List<QuotationDetailDto> updateProductToCart();

    public List<Void> deleteProductToCart();

}

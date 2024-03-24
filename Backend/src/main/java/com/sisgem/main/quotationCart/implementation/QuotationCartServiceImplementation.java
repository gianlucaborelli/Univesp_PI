package com.sisgem.main.quotationCart.implementation;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.sisgem.main.quotation.dto.QuotationDetailDto;
import com.sisgem.main.quotationCart.QuotationCartService;

@Service
public class QuotationCartServiceImplementation implements QuotationCartService {    

    @Override
    public List<QuotationDetailDto> findAllByUserId(UUID userId) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findAllByUserId'");
    }

    @Override
    public List<QuotationDetailDto> findById(UUID quotationCartId) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findById'");
    }

    @Override
    public List<QuotationDetailDto> createNewQuotationCart(UUID userId) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'createNewQuotationCart'");
    }

    @Override
    public List<Void> deleteQuotationCart(UUID quotationCartId) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'deleteQuotationCart'");
    }

    @Override
    public List<QuotationDetailDto> setShippingAddress() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'setShippingAddress'");
    }

    @Override
    public List<QuotationDetailDto> addProductToCart() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'addProductToCart'");
    }

    @Override
    public List<QuotationDetailDto> updateProductToCart() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'updateProductToCart'");
    }

    @Override
    public List<Void> deleteProductToCart() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'deleteProductToCart'");
    }

    @Override
    public List<QuotationDetailDto> findAll() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findAll'");
    }
    
}

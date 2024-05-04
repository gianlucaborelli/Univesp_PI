package com.sisgem.main.quotation.implementation;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.sisgem.main.authentication.AuthenticationService;
import com.sisgem.main.cart.Cart;
import com.sisgem.main.infra.exceptions.ResourceNotFound;
import com.sisgem.main.quotation.Quotation;
import com.sisgem.main.quotation.QuotationService;
import com.sisgem.main.quotation.converter.QuotationMapper;
import com.sisgem.main.quotation.dto.QuotationDetailDto;
import com.sisgem.main.quotation.enums.QuotationStatusEnum;
import com.sisgem.main.quotation.repository.QuotationRepository;

@Service
@Scope("prototype")
public class QuotationServiceImplementation implements QuotationService{
    @Autowired
    private QuotationMapper mapper;
    @Autowired
    private AuthenticationService authService;
    @Autowired
    private QuotationRepository quotationRepository;
    

    public List<QuotationDetailDto> findAll(){
        return mapper.toQuotationDetailList(quotationRepository.findAll());
    }

    @Override
    public QuotationDetailDto findById(UUID quotationId) {
        return mapper.toQuotationDetail(quotationRepository.findById(quotationId).get());
    }

    @Override
    public List<QuotationDetailDto> findAllByUserId(UUID userId) {
        return mapper.toQuotationDetailList(quotationRepository.findAllByUserId(userId));
    }

    @Override
    public List<QuotationDetailDto> findByIntervalOfDate(Date initialDate, Date finalDate){
        return mapper.toQuotationDetailList(quotationRepository.findByIntervalOfDates(initialDate, finalDate));
    }

    @Override
    public QuotationDetailDto CreateQuotationByCart(Cart cart) throws ResourceNotFound {

        Quotation quotation = mapper.cartToQuotation(cart);

        quotationRepository.save(quotation);

        Quotation quotationToAddQuotedProducts = quotationRepository.findById(quotation.getId()).get();

        quotationToAddQuotedProducts.addQuotedProductList(mapper.CartItemListToQuotedProductList(cart.getCartItens()));

        quotationRepository.save(quotationToAddQuotedProducts);        

        return mapper.toQuotationDetail(quotationToAddQuotedProducts);
    }

    @Override
    public QuotationDetailDto ChangeQuotationStatusById(UUID quotationId, int status) throws ResourceNotFound {
        Quotation quotation = quotationRepository.findById(quotationId).get();

        quotation.setStatus(QuotationStatusEnum.fromInt(status));

        quotationRepository.save(quotation);

        return mapper.toQuotationDetail(quotation);
    }

    @Override
    public void deleteQuotationById(UUID id) {
        if (authService.currentUserIsNotAdmin()){
            return;
        }
        quotationRepository.deleteById(id);        
    }    
}
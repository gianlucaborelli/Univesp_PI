package com.sisgem.main.quotation;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import com.sisgem.main.cart.Cart;
import com.sisgem.main.infra.exceptions.ResourceNotFound;
import com.sisgem.main.quotation.dto.QuotationDetailDto;

public interface QuotationService {
    List<QuotationDetailDto> findAll();

    QuotationDetailDto findById(UUID quotationId);

    List<QuotationDetailDto> findAllByUserId(UUID userId);

    List<QuotationDetailDto> findByIntervalOfDate(Date initialDate, Date finalDate);

    QuotationDetailDto CreateQuotationByCart(Cart cart ) throws ResourceNotFound;

    QuotationDetailDto ChangeQuotationStatusById(UUID quotationId, int status) throws ResourceNotFound;

    void deleteQuotationById(UUID id);
}

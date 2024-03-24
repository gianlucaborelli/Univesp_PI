package com.sisgem.main.quotation.converter;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import com.sisgem.main.quotation.Quotation;
import com.sisgem.main.quotation.dto.QuotationDetailDto;

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
}

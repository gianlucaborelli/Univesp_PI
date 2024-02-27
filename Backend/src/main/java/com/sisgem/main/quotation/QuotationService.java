package com.sisgem.main.quotation;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class QuotationService {
    @Autowired
    private QuotationRepository repository;

    public List<Quotation> findAll(){
        return repository.findAll();
    }
}

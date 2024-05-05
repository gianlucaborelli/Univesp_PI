package com.sisgem.main.quotation;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sisgem.main.infra.exceptions.ResourceNotFound;
import com.sisgem.main.quotation.dto.QuotationDetailDto;
import com.sisgem.main.quotation.dto.SetStatusRequest;

@RestController
@RequestMapping
public class QuotationController {
    @Autowired
    private QuotationService quotationService;

    @GetMapping("/quotations")
    public ResponseEntity<List<QuotationDetailDto>> listAll() {
        return ResponseEntity.ok(quotationService.findAll());
    }

    @GetMapping("/quotations/{id}")
    public ResponseEntity<QuotationDetailDto> findById(
            @NonNull @PathVariable UUID id) {

        return ResponseEntity.ok(quotationService.findById(id));
    }    

    @GetMapping("/users/{userId}/quotations")
    public ResponseEntity<List<QuotationDetailDto>> findAllByUserId(
            @PathVariable UUID userId) {
        return ResponseEntity.ok(quotationService.findAllByUserId(userId));
    } 

    @GetMapping("/users/{userId}/quotations/{quotationId}")
    public ResponseEntity<QuotationDetailDto> findByUserId(
            @PathVariable UUID userId,
            @PathVariable UUID quotationId) {
        return ResponseEntity.ok(quotationService.findQuotationByUserId(userId, quotationId));
    }    

    @PutMapping("quotations/{id}/status")
    public ResponseEntity<QuotationDetailDto> setQuotationStatus(
            @PathVariable UUID id, 
            @RequestBody @NonNull SetStatusRequest request) throws ResourceNotFound{                                

        return ResponseEntity.ok(quotationService.ChangeQuotationStatusById(id, request.getStatusCode()));
    }

    @DeleteMapping("/quotations/{id}")
    public void deleteQuotation(
            @NonNull @PathVariable UUID id) {

        quotationService.deleteQuotationById(id);
    }
}

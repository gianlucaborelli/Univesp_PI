package com.sisgem.main.quotation;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sisgem.main.quotation.converter.QuotationMapper;
import com.sisgem.main.quotation.dto.QuotationDetailDto;

@RestController
@RequestMapping("/quotation")
public class QuotationController {

    @Autowired
    private QuotationRepository quotationRepository;

    @Autowired
    private QuotationMapper mapper;

    @GetMapping
    public List<QuotationDetailDto> listAll() {

        return mapper.toQuotationDetailList(quotationRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<QuotationDetailDto> list(
            @NonNull @PathVariable UUID id) {

        return ResponseEntity.ok(mapper.toQuotationDetail(quotationRepository.findById(id).get()));
    }

    @GetMapping("/intervaloDeDatas")
    public List<Quotation> buscarPorIntervaloDeDatas(
            @RequestParam("initialDate") Date initialDate,
            @RequestParam("finalDate") Date finalDate) {

        return quotationRepository.findByIntervalOfDates(initialDate, finalDate);
    }

    @GetMapping("/cliente/{id}")
    public List<Quotation> listarPorCliente(
            @PathVariable UUID id) {

        return quotationRepository.findAllByUserId(id);
    }

    @PostMapping
    public ResponseEntity<Quotation> salvar(
            @NonNull @RequestBody Quotation orcamento) {

        Quotation orcamentoSalvo = quotationRepository.save(orcamento);
        return new ResponseEntity<>(orcamentoSalvo, HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<Quotation> alterar(
            @RequestBody Quotation orcamento) {

        Quotation orcamentoSalvo = new Quotation();
        if (orcamento.getId() != null) {
            orcamentoSalvo = quotationRepository.save(orcamento);
        }

        return new ResponseEntity<>(orcamentoSalvo, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public void excluir(
            @NonNull @PathVariable UUID id) {

        quotationRepository.deleteById(id);
    }
}

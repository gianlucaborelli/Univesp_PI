package com.sisgem.main.quotation;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/quotation")
public class QuotationController {

    @Autowired
    private QuotationRepository quotationRepository;

    @GetMapping
    public List<Quotation> listAll() {
        return quotationRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Quotation>> list(@PathVariable UUID id) {
        return ResponseEntity.ok(quotationRepository.findById(id));
    }

    @GetMapping("/intervaloDeDatas")
    public List<Quotation> buscarPorIntervaloDeDatas(@RequestParam("dataInicio") Date dataInicio,
            @RequestParam("dataFim") Date dataFim) {
        return quotationRepository.findByIntervalOfDates(dataInicio, dataFim);
    }

    @GetMapping("/cliente/{id}")
    public List<Quotation> listarPorCliente(@PathVariable UUID id) {
        return quotationRepository.findAllByUserId(id);
    }

    @PostMapping
    public ResponseEntity<Quotation> salvar(@RequestBody Quotation orcamento) {        
        Quotation orcamentoSalvo = quotationRepository.save(orcamento);
        return new ResponseEntity<>(orcamentoSalvo, HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<Quotation> alterar(@RequestBody Quotation orcamento) {
        Quotation orcamentoSalvo = new Quotation();
        if (orcamento.getId() != null) {
            orcamentoSalvo = quotationRepository.save(orcamento);
        }

        return new ResponseEntity<>(orcamentoSalvo, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public void excluir(@PathVariable UUID id) {
        quotationRepository.deleteById(id);
    }
}

package com.pi1.sisgem.controller;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pi1.sisgem.data.OrcamentoRepositorio;
import com.pi1.sisgem.entity.Orcamento;

@RestController
@RequestMapping("/produtos")
public class OncamentoController {
    
    @Autowired
    private OrcamentoRepositorio repositorio;

    @GetMapping("/intervalo-de-datas")
    public List<Orcamento> buscarPorIntervaloDeDatas(@RequestParam("dataInicio") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date dataInicio,
                                                      @RequestParam("dataFim") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date dataFim) {
        return repositorio.findByIntervaloDeDatas(dataInicio, dataFim);
    }
}

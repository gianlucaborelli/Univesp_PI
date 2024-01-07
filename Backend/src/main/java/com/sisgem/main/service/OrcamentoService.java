package com.sisgem.main.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sisgem.main.entity.Orcamento;
import com.sisgem.main.repository.OrcamentoRepositorio;

@Service
public class OrcamentoService {
    @Autowired
    private OrcamentoRepositorio repositorio;


    public List<Orcamento> findAll(){
        return repositorio.findAll();
    }
}

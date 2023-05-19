package com.pi1.sisgem.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pi1.sisgem.data.OrcamentoRepositorio;
import com.pi1.sisgem.entity.Orcamento;

@Service
public class OrcamentoService {
    @Autowired
    private OrcamentoRepositorio repositorio;


    public List<Orcamento> findAll(){
        return repositorio.findAll();
    }
}

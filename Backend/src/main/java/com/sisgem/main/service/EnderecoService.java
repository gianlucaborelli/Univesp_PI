package com.sisgem.main.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.sisgem.main.entity.Endereco;
import com.sisgem.main.repository.EnderecoRepositorio;
import com.sisgem.main.repository.DTO.enderecos.autoCompleteEnderecoResponse;

@Service
public class EnderecoService {

    @Autowired
    private EnderecoRepositorio repositorio;

    public List<Endereco> findEnderecosByUsuarioId(long id) {
        return this.repositorio.findByUsuarioId(id);

    }

    public autoCompleteEnderecoResponse findByCep(String cep) {
        RestTemplate restTemplate = new RestTemplate();
        String uri = "http://viacep.com.br/ws/{cep}/json/";
        Map<String, String> params = new HashMap<String, String>();
        params.put("cep", cep);
        autoCompleteEnderecoResponse endereco = restTemplate.getForObject(uri, autoCompleteEnderecoResponse.class,
                params);

        return endereco;
    }
}

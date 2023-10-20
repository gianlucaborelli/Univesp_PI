package com.pi1.sisgem.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.pi1.sisgem.data.EnderecoRepositorio;
import com.pi1.sisgem.data.DTO.enderecos.autoCompleteEnderecoResponse;
import com.pi1.sisgem.entity.Endereco;

@Service
public class EnderecoService {

    @Autowired
    private EnderecoRepositorio repositorio;

    public List<Endereco> findEnderecosByClienteID(long id) {
        return this.repositorio.findByClienteId(id);

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

package com.sisgem.main.address;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.sisgem.main.address.dto.AutoCompleteAddressResponse;
import com.sisgem.main.address.exceptions.AddressNotFoundException;

@Service
public class AddressService {

    @Autowired
    private AddressRepository addressRepository;

    public Address findById(@NonNull UUID addressId) {
        return this.addressRepository.findById(addressId)
                .orElseThrow(()  -> new AddressNotFoundException(addressId));
    }

    public List<Address> findAddressByUserId(UUID userId) {
        return this.addressRepository.findByUserId(userId);
    }

    public AutoCompleteAddressResponse findByCep(String cep) {
        RestTemplate restTemplate = new RestTemplate();
        String uri = "http://viacep.com.br/ws/{cep}/json/";
        Map<String, String> params = new HashMap<String, String>();
        params.put("cep", cep);
        AutoCompleteAddressResponse endereco = restTemplate.getForObject(uri, AutoCompleteAddressResponse.class,
                params);

        return endereco;
    }
}

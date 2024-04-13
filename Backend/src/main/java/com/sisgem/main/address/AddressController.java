package com.sisgem.main.address;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sisgem.main.address.converter.AddressMapper;
import com.sisgem.main.address.dto.AddAddressRequestDto;
import com.sisgem.main.address.dto.AddressAutoCompleteDto;
import com.sisgem.main.address.dto.AddressDetailDto;
import com.sisgem.main.address.dto.AutoCompleteAddressResponse;
import com.sisgem.main.infra.exceptions.ResourceNotFound;
import com.sisgem.main.infra.exceptions.UserNotFoundException;
import com.sisgem.main.user.User;
import com.sisgem.main.user.UserRepository;

import jakarta.validation.Valid;

@RestController
public class AddressController {
    @Autowired
    private AddressRepository addressRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AddressService service;
    @Autowired
    private AddressMapper mapper;

    @GetMapping("/users/{userId}/address/{addressId}")
    public ResponseEntity<AddressDetailDto> findById(
            @NonNull @PathVariable UUID userId,
            @NonNull @PathVariable UUID addressId)
                throws UserNotFoundException, ResourceNotFound {
                    
        userRepository.findById(userId)
                        .orElseThrow(() -> new UserNotFoundException("Usuário não encontrado!"));

        var address = addressRepository.findById(addressId)
                        .orElseThrow(() -> new ResourceNotFound(String.format("Endereço com ID %s não encontrado!", addressId)));

        return ResponseEntity.ok().body(mapper.toAddressDetail(address));
    }

    @GetMapping("/users/{userId}/address")
    public ResponseEntity<List<AddressDetailDto>> findAddressByUserId(
            @NonNull @PathVariable UUID userId)
                throws UserNotFoundException {

        userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("Usuário não encontrado"));

        var addresses = service.findAddressByUserId(userId);

        return ResponseEntity.ok().body(mapper.toAddressDetailList(addresses));
    }

    @GetMapping("/address/findByCep")
    public ResponseEntity<AddressAutoCompleteDto> consultAddressByZipCode(
            @RequestParam("cep") String cep)
                throws ResourceNotFound {

        cep = cep.replace("-", "");

        if (!cep.matches("\\d+") | cep.length() != 8) {
            throw new ResourceNotFound("CEP inválido");
        }

        AutoCompleteAddressResponse endereco = service.findByCep(cep);

        if (endereco.getLocalidade() == null || endereco.getUf() == null) {
            throw new ResourceNotFound("CEP não encontrado");
        }

        return ResponseEntity.ok(mapper.toAddressAutoComplete(endereco));
    }

    @PostMapping("/users/{userId}/address")
    public ResponseEntity<AddressDetailDto> addNewAddress(
            @NonNull @PathVariable UUID userId,
            @Valid @RequestBody AddAddressRequestDto newAddress)
                throws UserNotFoundException {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("Usuário não encontrado"));

        var address = mapper.toAddress(newAddress);

        address.setUser(user);

        address = addressRepository.save(address);

        return ResponseEntity.ok(mapper.toAddressDetail(address));
    }

    @PutMapping("/users/{userId}/address")
    public ResponseEntity<AddressDetailDto> alterar(
            @NonNull @PathVariable UUID userId, 
            @Valid @RequestBody Address endereco)
                throws UserNotFoundException {

        userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("Usuário não encontrado"));

        Address address = new Address();
        if (endereco.getId() != null) {
            address = addressRepository.save(endereco);
        }

        return ResponseEntity.ok(mapper.toAddressDetail(address));
    }

    @DeleteMapping("/users/{userId}/address/{addressId}")
    public ResponseEntity<Void> excluir(@NonNull @PathVariable UUID userId, @NonNull @PathVariable UUID addressId)
            throws UserNotFoundException {
        userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("Usuário não encontrado"));

        addressRepository.deleteById(addressId);

        return ResponseEntity.noContent().build();
    }
}

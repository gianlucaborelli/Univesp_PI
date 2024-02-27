package com.sisgem.main.address;

import java.util.List;
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
import org.springframework.web.bind.annotation.RestController;

import com.sisgem.main.address.converter.AddressMapper;
import com.sisgem.main.address.dto.AddAddressRequestDto;
import com.sisgem.main.address.dto.AddressDetailDto;
import com.sisgem.main.address.dto.AutoCompleteAddressResponse;
import com.sisgem.main.infra.exceptions.ResourceNotFound;
import com.sisgem.main.infra.exceptions.UserNotFoundException;
import com.sisgem.main.user.User;
import com.sisgem.main.user.UserRepository;

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
    public ResponseEntity<AddressDetailDto> findById(@PathVariable UUID userId, @PathVariable UUID addressId)
            throws UserNotFoundException {
        userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("Usuário não encontrado"));

        var address = addressRepository.findById(addressId).get();

        return ResponseEntity.ok().body(mapper.toAddressDetail(address));
    }

    @GetMapping("/users/{userId}/address")
    public ResponseEntity<List<AddressDetailDto>> findAddressByUserId(@PathVariable UUID userId)
            throws UserNotFoundException {
        userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("Usuário não encontrado"));

        var addresses = service.findEnderecosByUsuarioId(userId);

        return ResponseEntity.ok().body(mapper.toAddressDetailList(addresses));
    }

    @GetMapping("/address/findByCep/{cep}")
    public ResponseEntity<AutoCompleteAddressResponse> consultAddressByZipCode(@PathVariable String cep)
            throws ResourceNotFound {

        cep = cep.replace("-", "");

        if (!cep.matches("\\d+") | cep.length() != 8) {
            throw new ResourceNotFound("CEP inválido", HttpStatus.BAD_REQUEST);
        }

        AutoCompleteAddressResponse endereco = service.findByCep(cep);

        if (endereco.getLocalidade() == null || endereco.getUf() == null) {
            throw new ResourceNotFound("CEP não encontrado", HttpStatus.NOT_FOUND);
        }

        return ResponseEntity.ok(endereco);
    }

    @PostMapping("/users/{userId}/address")
    public ResponseEntity<AddressDetailDto> addNewAddress(@PathVariable UUID userId,
            @RequestBody AddAddressRequestDto newAddress) throws UserNotFoundException {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("Usuário não encontrado"));

        var address = mapper.toAddress(newAddress);

        address.setUser(user);

        address = addressRepository.save(address);

        return ResponseEntity.ok(mapper.toAddressDetail(address));
    }

    @PutMapping("/users/{userId}/address")
    public ResponseEntity<AddressDetailDto> alterar(@PathVariable UUID userId, @RequestBody Address endereco) throws UserNotFoundException {
        userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("Usuário não encontrado"));
        
        Address address = new Address();
        if (endereco.getId() != null){
             address = addressRepository.save(endereco);
        }

        return ResponseEntity.ok(mapper.toAddressDetail(address));
    }

    @DeleteMapping("/users/{userId}/address/{addressId}")
    public ResponseEntity<Void> excluir(@PathVariable UUID userId, @PathVariable UUID addressId) throws UserNotFoundException {
        userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("Usuário não encontrado"));

        addressRepository.deleteById(addressId);

        return ResponseEntity.noContent().build();
    }
}

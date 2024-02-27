package com.sisgem.main.address.converter;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import com.sisgem.main.address.Address;
import com.sisgem.main.address.dto.AddAddressRequestDto;
import com.sisgem.main.address.dto.AddressDetailDto;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class AddressMapper {

    private final ModelMapper mapper;

    public Address toAddress(AddAddressRequestDto address) {
        return mapper.map(address, Address.class);
    }  
    
    public AddressDetailDto toAddressDetail(Address address) {
        return mapper.map(address, AddressDetailDto.class);        
    } 

    public List<AddressDetailDto> toAddressDetailList(List<Address> addresses) {
        return addresses.stream()
                .map(this::toAddressDetail)
                .collect(Collectors.toList());
    }
}

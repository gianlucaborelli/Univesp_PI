package com.sisgem.main.address.converter;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import com.sisgem.main.address.Address;
import com.sisgem.main.address.dto.AddAddressRequestDto;
import com.sisgem.main.address.dto.AddressAutoCompleteDto;
import com.sisgem.main.address.dto.AddressDetailDto;
import com.sisgem.main.address.dto.AutoCompleteAddressResponse;

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

    public AddressAutoCompleteDto toAddressAutoComplete(AutoCompleteAddressResponse address) {
        var addressAutoComplete = new AddressAutoCompleteDto();
        addressAutoComplete.setStreet(address.getLogradouro());
        addressAutoComplete.setDistrict(address.getBairro());
        addressAutoComplete.setCity(address.getLocalidade());
        addressAutoComplete.setZipCode(address.getCep());
        addressAutoComplete.setState(address.getUf());
        return addressAutoComplete;
    } 
}

package com.sisgem.main.user.dto;

import java.util.List;
import java.util.UUID;

import com.sisgem.main.address.dto.AddressDetailDto;
import com.sisgem.main.user.enums.Role;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDetailDto{

    private UUID id;
    
    private String name;
    
    private String email;

    private String obs;

    private Role role;

    private List<AddressDetailDto> addresses;
}
package com.sisgem.main.user.dto;

import java.util.UUID;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserUpdateRequestDto{
    
    private UUID id;
    
    private String name;
    
    private String email;

    private String obs;
}
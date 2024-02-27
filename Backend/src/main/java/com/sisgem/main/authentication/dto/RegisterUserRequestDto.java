package com.sisgem.main.authentication.dto;

import jakarta.validation.constraints.Email;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterUserRequestDto {
    private String name; 

    @Email(message = "Email invalido")
    private String email;
    
    private String password;    
}

package com.sisgem.main.repository.Mapper;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import com.sisgem.main.entity.Usuario;
import com.sisgem.main.repository.DTO.authentication.RegisterNewUserDto;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class AuthenticationMapper {
    private final ModelMapper mapper;

    public Usuario toNovoUsuario(RegisterNewUserDto newUserDto) {
        return mapper.map(newUserDto, Usuario.class);
    }
}
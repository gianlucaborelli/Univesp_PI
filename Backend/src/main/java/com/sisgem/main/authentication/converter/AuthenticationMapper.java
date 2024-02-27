package com.sisgem.main.authentication.converter;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import com.sisgem.main.authentication.dto.RegisterUserRequestDto;
import com.sisgem.main.user.User;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class AuthenticationMapper {
    private final ModelMapper mapper;

    public User toNovoUsuario(RegisterUserRequestDto newUserDto) {
        return mapper.map(newUserDto, User.class);
    }
}
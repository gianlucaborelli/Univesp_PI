package com.sisgem.main.user.converter;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import com.sisgem.main.user.User;
import com.sisgem.main.user.dto.UserDetailDto;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class UserMapper {
    private final ModelMapper mapper;

    public UserDetailDto toUserDetail(User user) {
        return mapper.map(user, UserDetailDto.class);
    }

    public List<UserDetailDto> toUserDetailList(List<User> users) {
        return users.stream()
                .map(this::toUserDetail)
                .collect(Collectors.toList());
    }
}

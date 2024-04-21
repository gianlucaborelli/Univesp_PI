package com.sisgem.main.authentication.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class LoginResultDto {

    private String accessToken;
    private String refreshToken;
}
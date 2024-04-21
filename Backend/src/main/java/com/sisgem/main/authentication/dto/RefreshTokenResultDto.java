package com.sisgem.main.authentication.dto;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class RefreshTokenResultDto {
    private String accessToken;
    private String refreshToken;
}

package com.sisgem.main.authentication;

import java.security.SecureRandom;
import java.time.Duration;
import java.time.Instant;
import java.util.Base64;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sisgem.main.infra.exceptions.RefreshTokenExpiredException;
import com.sisgem.main.infra.exceptions.RefreshTokenNotFoundException;
import com.sisgem.main.user.User;
import com.sisgem.main.user.UserRepository;

@Service
public class RefreshTokenService {    
    private static long expiryInstantInMinutes = 45;

    private static SecureRandom random = new SecureRandom();
    private static Base64.Encoder encoder = Base64.getUrlEncoder().withoutPadding();

    @Autowired
    private RefreshTokenRepository refreshTokenRepository;
    @Autowired
    private UserRepository userRepository;

    public String createRefreshToken(String userEmail) {

        User user = userRepository.findByEmail(userEmail).get();
        RefreshToken token = user.getRefreshToken();

        if (token == null) {
            token = RefreshToken.builder()
                    .refreshToken(generateRandomToken())
                    .expiryInstant(Instant.now().plus(Duration.ofMinutes(expiryInstantInMinutes)))
                    .user(user)
                    .build();
        } else {
            token.setRefreshToken(generateRandomToken());
            token.setExpiryInstant(Instant.now().plus(Duration.ofMinutes(expiryInstantInMinutes)));
        }

        refreshTokenRepository.save(token);

        return token.getRefreshToken();
    }

    public RefreshToken verifyRefresToken(String refreshToken)
            throws RefreshTokenNotFoundException, RefreshTokenExpiredException {
        RefreshToken token = refreshTokenRepository.findByRefreshToken(refreshToken)
                .orElseThrow(() -> new RefreshTokenNotFoundException("RefreshToken não encontrado"));

        if (token.getExpiryInstant().compareTo(Instant.now()) < 0) {
            refreshTokenRepository.delete(token);
            throw new RefreshTokenExpiredException("Token Expirado");
        }

        return token;
    }

    private String generateRandomToken() {
        byte[] buffer = new byte[64];

        random.nextBytes(buffer);

        return encoder.encodeToString(buffer);
    }
}

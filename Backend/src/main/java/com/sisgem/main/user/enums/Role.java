package com.sisgem.main.user.enums;

public enum Role {
    ROLE_ADMIN,
    ROLE_USER;

    public static Role fromInt(int value) {
        switch (value) {
            case 0:
                return ROLE_ADMIN;
            case 1:
                return ROLE_USER;
            default:
                throw new IllegalArgumentException("Valor inválido para Role: " + value);
        }
    }
}
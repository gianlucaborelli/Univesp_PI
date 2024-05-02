package com.sisgem.main.quotation.enums;

public enum QuotationStatusEnum {
    PENDING,
    CONFIRMED,
    AWAITING_PAYAMENT,
    PAID,
    CONCLUDED,
    CANCELED;

    public static QuotationStatusEnum fromInt(int value) {
        switch (value) {
            case 0:
                return PENDING;
            case 1:
                return CONFIRMED;
            case 2:
                return AWAITING_PAYAMENT;
            case 3:
                return PAID;
            case 4:
                return CONCLUDED;
            case 5:
                return CANCELED;
            default:
                throw new IllegalArgumentException("Valor inválido: " + value);
        }
    }
}

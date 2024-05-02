package com.sisgem.main.cart.dto;

import java.util.UUID;

public record AddCartItemDtoRequest(UUID productId, int amount) {}

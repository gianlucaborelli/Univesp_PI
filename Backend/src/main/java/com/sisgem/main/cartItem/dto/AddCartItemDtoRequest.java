package com.sisgem.main.cartItem.dto;

import java.util.UUID;

public record AddCartItemDtoRequest(UUID productId, int amount) {}

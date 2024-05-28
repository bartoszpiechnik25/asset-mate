package com.bartoszpiechnik25.assetmate.api.v1.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class InvestRequest {
    private String symbol;
    private Double volume;
    private Double openPrice;
    private String currency;
    private UUID userId;
}

package com.bartoszpiechnik25.assetmate.api.v1.dto.response;

import com.bartoszpiechnik25.entity.Symbol;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CryptocurrencyDto {
    private UUID id;
    private String yahooSymbol;
    private String cryptoSymbol;
    private String description;
    private String name;
    private String geckoId;
    private String instrumentTypeName;
}

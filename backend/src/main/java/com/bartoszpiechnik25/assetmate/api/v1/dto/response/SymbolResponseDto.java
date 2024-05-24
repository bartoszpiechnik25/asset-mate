package com.bartoszpiechnik25.assetmate.api.v1.dto.response;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SymbolResponseDto {
    private String yahooSymbol;
    private String instrumentTypeName;
    private String description;
}

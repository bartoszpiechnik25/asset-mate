package com.bartoszpiechnik25.assetmate.api.v1.dto.request;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AddSymbolRequest {
    private String description;
    private String yahooSymbol;
    private String instrumentType;
}

package com.bartoszpiechnik25.assetmate.api.v1.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EtfDetailsDto {
    private String yahooSymbol;
    private String instrumentTypeName;
    private String description;
    private String name;
    private String isin;
    private Integer totalAssets;
    private Map<String, Object> holdings;
    private Map<String, Object> Weights;
}

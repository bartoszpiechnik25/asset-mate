package com.bartoszpiechnik25.assetmate.api.v1.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class StockDetailsDto {
    private String stockName;
    private String businessSummary;
    private String yahooSymbol;
    private String instrumentTypeName;
    private String industryName;
    private String sectorName;
}

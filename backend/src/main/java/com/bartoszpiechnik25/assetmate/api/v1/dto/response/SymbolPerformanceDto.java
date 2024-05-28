package com.bartoszpiechnik25.assetmate.api.v1.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SymbolPerformanceDto {
    private Double oneMonth;
    private Double threeMonths;
    private Double sixMonths;
    private Double oneYear;
    private Double ytd;
    private Double threeYears;
    private Double fiveYears;
    private Double max;
}

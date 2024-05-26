package com.bartoszpiechnik25.assetmate.api.v1.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserInvestmentsDto {
    private String yahooSymbol;
    private Double openPrice;
    private Double marketPrice;
    private Double volume;
    private String currencyName;
    private String instrumentTypeName;
}

package com.bartoszpiechnik25.assetmate.api.v1.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CryptocurrencyCategoryDto {
    Integer id;
    String category;
}

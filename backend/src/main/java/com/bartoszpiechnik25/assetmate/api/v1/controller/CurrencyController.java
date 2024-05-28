package com.bartoszpiechnik25.assetmate.api.v1.controller;

import com.bartoszpiechnik25.assetmate.api.v1.dto.response.CurrencyResponseDto;
import com.bartoszpiechnik25.assetmate.api.v1.service.CurrencyService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/currency")
@AllArgsConstructor
public class CurrencyController {
    private final CurrencyService service;
    private final ModelMapper mapper;

    @GetMapping()
    public ResponseEntity<?> getCurrencies() {
        var currencies = service.getAvailableCurrencies();
        if (currencies == null) {
            HttpHeaders header = new HttpHeaders();
            header.add("Content-Type", "application/json");
            return new ResponseEntity<>(
                    Map.of("message", "cannot fetch currencies"),
                    header,
                    HttpStatus.BAD_REQUEST
            );
        }
        return ResponseEntity.ok(
                mapper.map(currencies, CurrencyResponseDto[].class)
        );
    }
}

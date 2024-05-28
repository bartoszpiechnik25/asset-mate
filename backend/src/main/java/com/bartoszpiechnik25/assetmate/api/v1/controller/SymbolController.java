package com.bartoszpiechnik25.assetmate.api.v1.controller;


import com.bartoszpiechnik25.assetmate.api.v1.dto.response.SymbolPerformanceDto;
import com.bartoszpiechnik25.assetmate.api.v1.dto.response.SymbolResponseDto;
import com.bartoszpiechnik25.assetmate.api.v1.service.SymbolService;
import com.bartoszpiechnik25.entity.SymbolPerformance;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/symbols")
@RequiredArgsConstructor
public class SymbolController {
    private final SymbolService symbolService;
    private final ModelMapper mapper;

    @GetMapping()
    public ResponseEntity<?> getSymbols() {
        var symbols = symbolService.getAllSymbols();

        if (symbols == null) {
            HttpHeaders header = new HttpHeaders();
            header.add("Content-Type", "application/json");
            return new ResponseEntity<>(
                    Map.of("message", "cannot fetch any symbols"),
                    header,
                    HttpStatus.BAD_REQUEST
            );
        }
        return ResponseEntity.ok(
                mapper.map(symbols, SymbolResponseDto[].class)
        );
    }

    @GetMapping("/performance/{yahoo_symbol}")
    public ResponseEntity<?> getSymbolPerformance(@PathVariable String yahoo_symbol) {
        var performance = symbolService.getSymbolPerformance(yahoo_symbol);
        if (performance == null) {
            HttpHeaders header = new HttpHeaders();
            header.add("Content-Type", "application/json");
            return new ResponseEntity<>(
                    Map.of("message", "cannot performance for symbol: " + yahoo_symbol),
                    header,
                    HttpStatus.BAD_REQUEST
            );
        }
        return ResponseEntity.ok(
                mapper.map(performance, SymbolPerformanceDto.class)
        );
    }


}

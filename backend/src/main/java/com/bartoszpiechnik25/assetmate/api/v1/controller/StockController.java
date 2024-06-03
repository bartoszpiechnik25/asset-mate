package com.bartoszpiechnik25.assetmate.api.v1.controller;

import com.bartoszpiechnik25.assetmate.api.v1.dto.response.StockDetailsDto;
import com.bartoszpiechnik25.assetmate.api.v1.service.StockService;
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
@RequestMapping("/api/v1/stock")
@RequiredArgsConstructor
public class StockController {
    private final StockService service;
    private final ModelMapper mapper;

    @GetMapping("/{yahoo_symbol}")
    public ResponseEntity<?> getStockDetails(@PathVariable String yahoo_symbol) {
        var stock = service.getStockByYahooSymbol(yahoo_symbol);
        if (stock == null) {
            var header = new HttpHeaders();
            header.add("Content-Type", "application/json");
            return new ResponseEntity<>(
                    Map.of("message", "stock with given symbol does not exist"),
                    header,
                    HttpStatus.NOT_FOUND
            );
        }
        return ResponseEntity.ok(
                mapper.map(stock, StockDetailsDto.class)
        );
    }
}

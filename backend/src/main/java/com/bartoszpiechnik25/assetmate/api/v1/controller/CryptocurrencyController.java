package com.bartoszpiechnik25.assetmate.api.v1.controller;

import com.bartoszpiechnik25.assetmate.api.v1.dto.request.CreateCryptocurrencyCategoryRequest;
import com.bartoszpiechnik25.assetmate.api.v1.dto.response.CryptocurrencyCategoryDto;
import com.bartoszpiechnik25.assetmate.api.v1.dto.response.CryptocurrencyDto;
import com.bartoszpiechnik25.assetmate.api.v1.dto.response.ListCoinsDto;
import com.bartoszpiechnik25.assetmate.api.v1.service.AvailableCoinsLookUp;
import com.bartoszpiechnik25.assetmate.api.v1.service.CryptocurrencyService;
import com.bartoszpiechnik25.entity.Cryptocurrency;
import com.bartoszpiechnik25.entity.CryptocurrencyCategory;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
import org.apache.catalina.connector.Request;
import org.modelmapper.ModelMapper;
import org.springframework.boot.json.GsonJsonParser;
import org.springframework.boot.json.JsonParser;
import org.springframework.boot.json.JsonParserFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.json.GsonBuilderUtils;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/cryptocurrencies")
@RequiredArgsConstructor
public class CryptocurrencyController {

    private final CryptocurrencyService service;
    private final AvailableCoinsLookUp coinsLookUp;
    private final ModelMapper modelMapper;

    @GetMapping(produces = "application/json")
    public ResponseEntity<?> getCryptocurrencies(@RequestParam(required = false) Map<String, String> params) {
        if (!params.isEmpty()) {
            Cryptocurrency cryptocurrency = null;
            if (params.containsKey("geckoId")) {
                cryptocurrency = service.getCryptocurrencyByGeckoId(params.get("geckoId"));
                System.out.println(cryptocurrency);
            }
            if (params.containsKey("id")) {
                cryptocurrency = service.getCryptocurrency(UUID.fromString(params.get("id")));
            }
            if (cryptocurrency == null) {
                HttpHeaders h = new HttpHeaders();
                h.add("Content-Type", "application/json; charset=utf-8");
                return new ResponseEntity<>(
                        Map.of("messasge", "cryptcourrency with given ids does not exist"),
                        h,
                        HttpStatus.NOT_FOUND
                );
            } else {
                return ResponseEntity.ok(
                  modelMapper.map(cryptocurrency, CryptocurrencyDto.class)
                );
            }
        }
        return ResponseEntity.ok(
                service.getCryptocurrencies()
                        .stream()
                        .map(cryptocurrency -> modelMapper.map(cryptocurrency, CryptocurrencyDto.class))
                        .collect(Collectors.toList())
        );
    }
    @PostMapping
    public ResponseEntity<Cryptocurrency> addCryptocurrency(@RequestBody String gecko_id) {
        return null;
    }
    @GetMapping(value = "/{crypto_id}", produces = "application/json")
    public ResponseEntity<?> getCryptocurrency(@PathVariable String crypto_id) {
        UUID cryptoId = null;
        try {
            cryptoId = UUID.fromString(crypto_id);
        } catch (java.lang.IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(
                    Map.of("message", e.getMessage(), "code", HttpStatus.BAD_REQUEST.value())
            );
        }
        var crypto = service.getCryptocurrency(cryptoId);
        if (crypto == null) {
            HttpHeaders header = new HttpHeaders();
            header.add("Content-Type", "application/json; charset=utf-8");
            return new ResponseEntity<>(
                    Map.of("message", "could not found cryptocurrency with given id"),
                    header,
                    HttpStatus.NOT_FOUND
            );
        }
        return ResponseEntity.ok(
                modelMapper.map(crypto, CryptocurrencyDto.class)
        );
    }

    @PostMapping(value = "/categories", consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> createNewCategory(
            @RequestBody CreateCryptocurrencyCategoryRequest category
    ) {
        try {
            return ResponseEntity.ok(
                    modelMapper.map(service.createNewCategory(category), CryptocurrencyCategoryDto.class)
            );
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    @GetMapping("/categories")
    public ResponseEntity<List<CryptocurrencyCategoryDto>> getCategories() {
        return ResponseEntity.ok(
                service.getCryptocurrencyCategories()
                        .stream()
                        .map(category -> modelMapper.map(category, CryptocurrencyCategoryDto.class))
                        .collect(Collectors.toList())
        );
    }
    @GetMapping("/categories/{category_name}")
    public ResponseEntity<List<Cryptocurrency>> getCryptocurrenciesWithCategory(@PathVariable String category_name) {
        return null;
    }

    @GetMapping("/exists/{gecko_id}")
    public ResponseEntity<?> checkIfTokenExists(@PathVariable String gecko_id) {
        var coin = coinsLookUp.getCryptoMap().getOrDefault(gecko_id, null);
        if (coin == null) {
            HttpHeaders h = new HttpHeaders();
            h.add("Content-Type", "application/json; charset=utf-8");
            return new ResponseEntity<>(
                    Map.of("messasge", String.format("coin with id: %s is not supported", gecko_id)),
                    h,
                    HttpStatus.NOT_FOUND
            );
        }
        return ResponseEntity.ok(coin);
    }

    @GetMapping("/available")
    public ResponseEntity<?> getAvailableCoins() {
        var availableCoins = coinsLookUp.getCryptoMap();
        if (availableCoins == null) {
            var header = new HttpHeaders();
            header.add("Content-Type", "application/json");
            return new ResponseEntity<>(
                    Map.of("message", "cannot fetch available coins"),
                    header,
                    HttpStatus.BAD_REQUEST
            );
        }
        return ResponseEntity.ok(
                availableCoins
        );
    }

}

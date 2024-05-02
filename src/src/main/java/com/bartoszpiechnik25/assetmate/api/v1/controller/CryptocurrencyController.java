package com.bartoszpiechnik25.assetmate.api.v1.controller;

import com.bartoszpiechnik25.entity.Cryptocurrency;
import com.bartoszpiechnik25.entity.CryptocurrencyCategory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/cryptocurrencies")
public class CryptocurrencyController {
    @GetMapping
    public ResponseEntity<List<Cryptocurrency>> getCryptocurrencies(@RequestParam(required = false) Map<String, String> params) {
        return null;
    }
    @PostMapping
    public ResponseEntity<Cryptocurrency> addCryptocurrency(@RequestBody String gecko_id) {
        return null;
    }
    @GetMapping("/{crypto_id}")
    public ResponseEntity<Cryptocurrency> getCryptocurrency(@PathVariable String crypto_id) {
        return null;
    }
    @PostMapping("/categories")
    public ResponseEntity<CryptocurrencyCategory> createNewCategory(@RequestBody String category) {
        return null;
    }
    @GetMapping("/categories")
    public ResponseEntity<List<CryptocurrencyCategory>> getCategories() {
        return null;
    }
    @GetMapping("/{crypto_id}/categories/{category_id}")
    public ResponseEntity<List<Cryptocurrency>> getCryptocurrenciesWithCategory(@PathVariable String crypto_id, @PathVariable String category_id) {
        return null;
    }
}

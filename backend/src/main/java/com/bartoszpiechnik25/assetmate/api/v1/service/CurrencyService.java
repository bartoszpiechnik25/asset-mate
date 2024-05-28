package com.bartoszpiechnik25.assetmate.api.v1.service;


import com.bartoszpiechnik25.assetmate.api.v1.repository.CurrencyRepository;
import com.bartoszpiechnik25.entity.Currency;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CurrencyService {
    private final CurrencyRepository repository;

    public List<Currency> getAvailableCurrencies() {
        return repository.findAll();
    }
}

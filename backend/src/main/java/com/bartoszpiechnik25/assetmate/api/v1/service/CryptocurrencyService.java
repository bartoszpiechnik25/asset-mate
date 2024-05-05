package com.bartoszpiechnik25.assetmate.api.v1.service;

import com.bartoszpiechnik25.assetmate.api.v1.dto.request.CreateCryptocurrencyCategoryRequest;
import com.bartoszpiechnik25.assetmate.api.v1.repository.CryptocurrencyCategoryRepository;
import com.bartoszpiechnik25.assetmate.api.v1.repository.CryptocurrencyRepository;
import com.bartoszpiechnik25.entity.Cryptocurrency;
import com.bartoszpiechnik25.entity.CryptocurrencyCategory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class CryptocurrencyService {

    private final CryptocurrencyRepository repository;
    private final CryptocurrencyCategoryRepository cryptocurrencyCategoryRepository;

    public List<Cryptocurrency> getCryptocurrencies() {
        return repository.findAll();
    }

    public Cryptocurrency getCryptocurrency(UUID id) {
        try {
            return repository.findById(id).orElseThrow();
        } catch (java.util.NoSuchElementException e) {
            return null;
        }
    }

    public Cryptocurrency getCryptocurrencyByGeckoId(String geckoId) {
        try {
            return repository.findByGeckoId(geckoId).orElseThrow();
        } catch (java.util.NoSuchElementException e) {
            return null;
        }
    }

    public List<CryptocurrencyCategory> getCryptocurrencyCategories() {
        return cryptocurrencyCategoryRepository.findAll();
    }

    public CryptocurrencyCategory getCategory(Integer id) {
        try {
            return cryptocurrencyCategoryRepository.findById(id).orElseThrow();
        } catch (java.util.NoSuchElementException e) {
            return null;
        }
    }

    public CryptocurrencyCategory getCategory(String name) {
        try {
            return cryptocurrencyCategoryRepository.findByCategoryName(name).orElseThrow();
        } catch (java.util.NoSuchElementException e) {
            return null;
        }
    }

    public CryptocurrencyCategory createNewCategory(CreateCryptocurrencyCategoryRequest category) {
        return cryptocurrencyCategoryRepository.save(
                CryptocurrencyCategory
                        .builder()
                        .categoryName(category.getCategory())
                        .build()
        );
    }

}

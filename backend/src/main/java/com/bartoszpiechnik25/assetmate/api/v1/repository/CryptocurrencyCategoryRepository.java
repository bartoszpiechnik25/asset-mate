package com.bartoszpiechnik25.assetmate.api.v1.repository;

import com.bartoszpiechnik25.entity.CryptocurrencyCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CryptocurrencyCategoryRepository extends JpaRepository<CryptocurrencyCategory, Integer> {
    Optional<CryptocurrencyCategory> findById(Integer id);
    Optional<CryptocurrencyCategory> findByCategoryName(String name);
}

package com.bartoszpiechnik25.assetmate.api.v1.repository;

import com.bartoszpiechnik25.entity.InvestmentHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface InvestmentsHistoryRepository extends JpaRepository<InvestmentHistory, UUID> {
    Optional<List<InvestmentHistory>> getInvestmentHistoriesByUserUsername(String username);
}

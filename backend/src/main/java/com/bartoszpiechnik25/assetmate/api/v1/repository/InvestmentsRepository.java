package com.bartoszpiechnik25.assetmate.api.v1.repository;

import com.bartoszpiechnik25.entity.Investment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface InvestmentsRepository extends JpaRepository<Investment, UUID> {
    Optional<List<Investment>> getInvestmentByUserId(UUID user_id);
    @Query("select i from Investment i where i.id not in (select h.investment.id from InvestmentHistory h)")
    Optional<List<Investment>> getInvestmentByUserUsername(String username);
}

package com.bartoszpiechnik25.assetmate.api.v1.repository;

import com.bartoszpiechnik25.entity.Investment;
import com.bartoszpiechnik25.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface InvestmentsRepository extends JpaRepository<Investment, UUID> {
    Optional<List<Investment>> getInvestmentByUserId(UUID user_id);
    Optional<List<Investment>> getInvestmentByUserUsername(String username);
}

package com.bartoszpiechnik25.assetmate.api.v1.service;

import com.bartoszpiechnik25.assetmate.api.v1.repository.InvestmentsRepository;
import com.bartoszpiechnik25.entity.Investment;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class InvestmentsService {
    private final InvestmentsRepository investmentsRepository;

    public List<Investment> getUserInvestments(UUID user_id) {
        return investmentsRepository.getInvestmentByUserId(user_id).orElse(null);
    }

    public List<Investment> getUserInvestments(String username) {
        return investmentsRepository.getInvestmentByUserUsername(username).orElse(null);
    }
}

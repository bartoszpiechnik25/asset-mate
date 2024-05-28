package com.bartoszpiechnik25.assetmate.api.v1.service;

import com.bartoszpiechnik25.assetmate.api.v1.dto.request.InvestRequest;
import com.bartoszpiechnik25.assetmate.api.v1.repository.CurrencyRepository;
import com.bartoszpiechnik25.assetmate.api.v1.repository.InvestmentsRepository;
import com.bartoszpiechnik25.assetmate.api.v1.repository.SymbolRepository;
import com.bartoszpiechnik25.assetmate.api.v1.repository.UserRepository;
import com.bartoszpiechnik25.entity.Investment;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class InvestmentsService {
    private final InvestmentsRepository investmentsRepository;
    private final SymbolRepository symbolRepository;
    private final UserRepository userRepository;
    private final CurrencyRepository currencyRepository;

    public List<Investment> getUserInvestments(UUID user_id) {
        return investmentsRepository.getInvestmentByUserId(user_id).orElse(null);
    }

    public List<Investment> getUserInvestments(String username) {
        return investmentsRepository.getInvestmentByUserUsername(username).orElse(null);
    }

    public Investment createUserInvestment(InvestRequest investRequest) {
        Investment newInvestment = new Investment();
        var symbol = symbolRepository.getSymbolByYahooSymbol(investRequest.getSymbol()).orElse(null);
        if (symbol == null) {
            return null;
        }
        var user = userRepository.findById(investRequest.getUserId()).orElse(null);
        if (user == null) {
            return null;
        }
        var currency = currencyRepository.findById(investRequest.getCurrency()).orElse(null);
        if (currency == null) {
            return null;
        }
        newInvestment.setSymbol(symbol);
        newInvestment.setCurrencyName(currency);
        newInvestment.setVolume(BigDecimal.valueOf(investRequest.getVolume()));
        newInvestment.setUser(user);
        newInvestment.setOpenPrice(BigDecimal.valueOf(investRequest.getOpenPrice()));
        newInvestment.setMarketPrice(new BigDecimal("90.12"));
        newInvestment.setAcquiredAt(OffsetDateTime.now());
        return investmentsRepository.save(newInvestment);
    }
}
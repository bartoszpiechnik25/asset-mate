package com.bartoszpiechnik25.assetmate.api.v1.service;

import com.bartoszpiechnik25.assetmate.api.v1.dto.request.InvestRequest;
import com.bartoszpiechnik25.assetmate.api.v1.repository.*;
import com.bartoszpiechnik25.entity.Investment;
import com.bartoszpiechnik25.entity.InvestmentHistory;
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
    private final InvestmentsHistoryRepository investmentsHistoryRepository;

    public List<Investment> getUserInvestments(UUID user_id) {
        return investmentsRepository.getInvestmentByUserId(user_id).orElse(null);
    }

    public List<Investment> getUserInvestments(String username) {
        return investmentsRepository.getInvestmentByUserUsername(username).orElse(null);
    }

    public List<InvestmentHistory> getUserHistory(String username) {
        return investmentsHistoryRepository.getInvestmentHistoriesByUserUsername(username).orElse(null);
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
        newInvestment.setMarketPrice(BigDecimal.valueOf(investRequest.getMarketPrice()));
        newInvestment.setAcquiredAt(OffsetDateTime.now());
        return investmentsRepository.save(newInvestment);
    }

    public InvestmentHistory closeInvestment(UUID investment_id) {
        System.out.println("siema");
        InvestmentHistory investmentHistory = new InvestmentHistory();
        var investment = investmentsRepository.findById(investment_id).orElse(null);
        if (investment == null) {
            return null;
        }
        investmentHistory.setInvestment(investment);
        investmentHistory.setUser(investment.getUser());
        investmentHistory.setClosedAt(OffsetDateTime.now());
        investmentHistory.setClosePrice(investment.getMarketPrice());
        return investmentsHistoryRepository.save(investmentHistory);
    }
}

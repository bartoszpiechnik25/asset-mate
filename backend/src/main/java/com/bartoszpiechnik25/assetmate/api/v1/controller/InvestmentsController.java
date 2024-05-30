package com.bartoszpiechnik25.assetmate.api.v1.controller;

import com.bartoszpiechnik25.assetmate.api.v1.dto.request.InvestRequest;
import com.bartoszpiechnik25.assetmate.api.v1.dto.response.InvestmentHistoryDto;
import com.bartoszpiechnik25.assetmate.api.v1.dto.response.UserInvestmentsDto;
import com.bartoszpiechnik25.assetmate.api.v1.service.InvestmentsService;
import com.bartoszpiechnik25.entity.Investment;
import com.bartoszpiechnik25.entity.InvestmentHistory;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/investments")
@RequiredArgsConstructor
public class InvestmentsController {
    private final InvestmentsService investmentsService;
    private final ModelMapper mapper;

    @GetMapping
    ResponseEntity<List<Investment>> getInvestments(@RequestParam(required = false) Map<String, String> params) {
        return null;
    }

    @PostMapping
    ResponseEntity<?> createInvestment(@RequestBody InvestRequest investment) {
        var result = investmentsService.createUserInvestment(investment);
        if (result == null) {
            HttpHeaders header = new HttpHeaders();
            header.add("Content-Type", "application/json");
            return new ResponseEntity<>(
                    Map.of("message", "could not create an investment with given data"),
                    header,
                    HttpStatus.BAD_REQUEST
            );
        }
        return ResponseEntity.ok(
                mapper.map(result, UserInvestmentsDto.class)
        );
    }

    @GetMapping("/{username}")
    ResponseEntity<?> getUserInvestments(@PathVariable String username) {
        var userInvestments = investmentsService.getUserInvestments(username);
        if (userInvestments == null) {
            HttpHeaders header = new HttpHeaders();
            header.add("Content-Type", "application/json");
            return new ResponseEntity<>(
                    Map.of("message", "could not fetch user investments"),
                    header,
                    HttpStatus.BAD_REQUEST
            );
        }
        return ResponseEntity.ok(
                mapper.map(userInvestments, UserInvestmentsDto[].class)
        );
    }

    @GetMapping("/{username}/history")
    ResponseEntity<?> getUserInvestmentsHistory(@PathVariable String username) {
        var history = investmentsService.getUserHistory(username);
        if (history == null) {
            HttpHeaders header = new HttpHeaders();
            header.add("Content-Type", "application/json");
            return new ResponseEntity<>(
                    Map.of("message", "could not fetch user history"),
                    header,
                    HttpStatus.BAD_REQUEST
            );
        }
        return ResponseEntity.ok(
                mapper.map(history, InvestmentHistoryDto[].class)
        );
    }

    @PostMapping("/{investment_id}/close")
    ResponseEntity<?> closeInvestment(@PathVariable("investment_id") String investment_id) {
        var id = UUID.fromString(investment_id);
        var investmentHistory = investmentsService.closeInvestment(id);
        if (investmentHistory == null) {
            HttpHeaders header = new HttpHeaders();
            header.add("Content-Type", "application/json");
            return new ResponseEntity<>(
                    Map.of("message", "could not close investment with id: " + investment_id),
                    header,
                    HttpStatus.BAD_REQUEST
            );
        }
        return ResponseEntity.ok(
                mapper.map(investmentHistory, InvestmentHistoryDto.class)
        );
    }

}

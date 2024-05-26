package com.bartoszpiechnik25.assetmate.api.v1.controller;

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
    ResponseEntity<Investment> createInvestment(@RequestBody Investment investment) {
        return null;
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
    @PostMapping("/{investment_id}/close")
    ResponseEntity<InvestmentHistory> closeInvestment(@PathVariable("investment_id") UUID investment_id) {
        return null;
    }

}

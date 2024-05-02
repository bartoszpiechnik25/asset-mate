package com.bartoszpiechnik25.assetmate.api.v1.controller;

import com.bartoszpiechnik25.entity.Investment;
import com.bartoszpiechnik25.entity.InvestmentHistory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/investments")
public class InvestmentsController {
    @GetMapping
    ResponseEntity<List<Investment>> getInvestments(@RequestParam(required = false) Map<String, String> params) {
        return null;
    }
    @PostMapping
    ResponseEntity<Investment> createInvestment(@RequestBody Investment investment) {
        return null;
    }
    @GetMapping("/{investment_id}")
    ResponseEntity<Investment> getInvestmentById(@PathVariable("investment_id") UUID investment_id) {
        return null;
    }
    @PatchMapping("/{investment_id}")
    ResponseEntity<Void> updateInvestment(@PathVariable("investment_id") UUID investment_id, @RequestParam(required = false) Map<String, Object> fields) {
        return null;
    }
    @PostMapping("/{investment_id}/close")
    ResponseEntity<InvestmentHistory> closeInvestment(@PathVariable("investment_id") UUID investment_id) {
        return null;
    }

}

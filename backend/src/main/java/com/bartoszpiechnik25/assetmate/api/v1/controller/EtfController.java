package com.bartoszpiechnik25.assetmate.api.v1.controller;


import com.bartoszpiechnik25.assetmate.api.v1.dto.response.EtfDetailsDto;
import com.bartoszpiechnik25.assetmate.api.v1.service.EtfService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/etf")
@RequiredArgsConstructor
public class EtfController {

    private final EtfService service;
    private final ModelMapper modelMapper;

    @GetMapping("/{yahoo_symbol}")
    public ResponseEntity<?> getEtfDetails(@PathVariable String yahoo_symbol) {
        var etf = service.getEtfDetails(yahoo_symbol);
        if (etf == null) {
            HttpHeaders h = new HttpHeaders();
            h.add("Content-Type", "application/json; charset=utf-8");
            return new ResponseEntity<>(
                    Map.of("messasge", "etf with given symbol does not exist"),
                    h,
                    HttpStatus.NOT_FOUND
            );
        }
        return ResponseEntity.ok(
          modelMapper.map(etf, EtfDetailsDto.class)
        );
    }
}

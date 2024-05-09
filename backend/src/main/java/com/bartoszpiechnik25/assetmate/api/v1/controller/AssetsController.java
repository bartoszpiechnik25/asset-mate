package com.bartoszpiechnik25.assetmate.api.v1.controller;

import com.bartoszpiechnik25.assetmate.api.v1.repository.InstrumentTypeRepository;
import com.bartoszpiechnik25.assetmate.api.v1.service.InstrumentTypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/assets")
@RequiredArgsConstructor
public class AssetsController {

    private final InstrumentTypeService service;
    @GetMapping("/types")
    public ResponseEntity<?> getAvailableAssetTypes() {
        return ResponseEntity.ok(service.getAvailableTypes());
    }
}

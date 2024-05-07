package com.bartoszpiechnik25.assetmate.api.v1.controller;


import com.bartoszpiechnik25.assetmate.api.v1.repository.UserRepository;
import com.bartoszpiechnik25.assetmate.api.v1.service.AuthService;
import com.bartoszpiechnik25.assetmate.api.v1.dto.request.AuthenticationRequest;
import com.bartoszpiechnik25.assetmate.api.v1.dto.response.AuthenticationResponse;
import com.bartoszpiechnik25.assetmate.api.v1.dto.request.RegisterRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService service;
    private final UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register (
            @RequestBody RegisterRequest request
    ) {
        return ResponseEntity.ok(service.register(request));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<?> register(
            @RequestBody AuthenticationRequest request
    ) {
        AuthenticationResponse response = null;
        try {
            response = service.authenticate(request);
        } catch (java.util.NoSuchElementException e) {
            HttpHeaders h = new HttpHeaders();
            h.add("Content-Type", "application/json; charset=utf-8");
            return new ResponseEntity<>(
                    Map.of("messasge", "user not found"),
                    h,
                    HttpStatus.NOT_FOUND
            );
        }
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{username}")
    public ResponseEntity<?> userExists(@PathVariable String username) {
        var user = userRepository.findByUsername(username);
        if (!user.isPresent()) {
            HttpHeaders h = new HttpHeaders();
            h.add("Content-Type", "application/json; charset=utf-8");
            return new ResponseEntity<>(
                    Map.of("messasge", "user not found"),
                    h,
                    HttpStatus.NOT_FOUND
            );
        }
        return ResponseEntity.noContent().build();
    }
}

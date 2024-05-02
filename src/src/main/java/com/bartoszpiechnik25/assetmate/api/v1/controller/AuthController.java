package com.bartoszpiechnik25.assetmate.api.v1.controller;


import com.bartoszpiechnik25.assetmate.api.v1.repository.UserRepository;
import com.bartoszpiechnik25.assetmate.api.v1.service.AuthService;
import com.bartoszpiechnik25.assetmate.api.v1.messages.AuthenticationRequest;
import com.bartoszpiechnik25.assetmate.api.v1.messages.AuthenticationResponse;
import com.bartoszpiechnik25.assetmate.api.v1.messages.RegisterRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody AuthenticationRequest request
    ) {
        return ResponseEntity.ok(service.authenticate(request));
    }
}

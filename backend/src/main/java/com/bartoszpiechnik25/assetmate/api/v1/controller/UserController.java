package com.bartoszpiechnik25.assetmate.api.v1.controller;

import com.bartoszpiechnik25.entity.*;
import jakarta.transaction.Transactional;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    @GetMapping
    @Transactional
    public ResponseEntity<List<User>> getUsers() {
        return null;
    }
    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        return null;
    }

    @PostMapping("/{user_id}/favourites")
    public ResponseEntity<Symbol> addInvestmentToFavourites(@PathVariable UUID user_id, @RequestBody Investment investment) {
        return null;
    }
    @GetMapping("/{user_id}/favourites")
    public ResponseEntity<List<Symbol>> getUserFavourites(@PathVariable UUID user_id) {
        return null;
    }
    @GetMapping("/{user_id}/investments")
    public ResponseEntity<List<Investment>> getUserInvestments(@PathVariable UUID user_id, @RequestParam(required = false) String status) {
        return null;
    }
    @PostMapping("/{user_id}/investments")
    public ResponseEntity<Investment> createUserInvestment(@PathVariable UUID user_id, @RequestBody Investment investment) {
        return null;
    }
    @PutMapping("/{user_id}/investments")
    public ResponseEntity<Void> updateUserInvestment(@PathVariable UUID user_id, @RequestBody Investment investment) {
        return null;
    }
    @PostMapping("/{user_id}/investments/{investment_id}/close")
    public ResponseEntity<Void> closeInvestment(@PathVariable UUID user_id, @PathVariable UUID investment_id) {
        return null;
    }
}

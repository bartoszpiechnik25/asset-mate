package com.bartoszpiechnik25.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "cryptocurrency")
public class Cryptocurrency {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "crypto_id", nullable = false)
    private UUID id;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "symbol_id", nullable = false)
    private Symbol symbol;

    @Column(name = "crypto_symbol", nullable = false, length = 20)
    private String cryptoSymbol;

    @Column(name = "description", nullable = false, length = Integer.MAX_VALUE)
    private String description;

    @Column(name = "name", length = 64)
    private String name;

    @Column(name = "gecko_id", nullable = false, length = Integer.MAX_VALUE)
    private String geckoId;

}

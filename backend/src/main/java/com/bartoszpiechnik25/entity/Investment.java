package com.bartoszpiechnik25.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "investment")
@Data
public class Investment {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "investment_id", nullable = false)
    private UUID id;

    @Column(name = "open_price", nullable = false)
    private BigDecimal openPrice;

    @Column(name = "market_price", nullable = false)
    private BigDecimal marketPrice;


    @Column(name = "acquired_at", nullable = false)
    private OffsetDateTime acquiredAt;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "currency_name", nullable = false)
    private Currency currencyName;

    @Column(name = "volume", nullable = false)
    private BigDecimal volume;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "symbol_id", nullable = false)
    private Symbol symbol;

}

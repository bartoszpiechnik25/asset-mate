package com.bartoszpiechnik25.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "symbol")
public class Symbol {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "symbol_id", nullable = false)
    private UUID id;

    @Column(name = "yahoo_symbol", nullable = false, length = 15)
    private String yahooSymbol;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "instrument_type_id", nullable = false)
    private InstrumentType instrumentType;
}

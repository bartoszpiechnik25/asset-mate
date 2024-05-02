package com.bartoszpiechnik25.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.ColumnDefault;

import java.math.BigDecimal;
import java.util.UUID;

@Entity
@Table(name = "symbol_performance")
public class SymbolPerformance {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "performance_id", nullable = false)
    private UUID id;

    @ColumnDefault("0")
    @Column(name = "ytd")
    private BigDecimal ytd;

    @ColumnDefault("0")
    @Column(name = "one_month")
    private BigDecimal oneMonth;

    @ColumnDefault("0")
    @Column(name = "three_months")
    private BigDecimal threeMonths;

    @ColumnDefault("0")
    @Column(name = "six_month")
    private BigDecimal sixMonth;

    @ColumnDefault("0")
    @Column(name = "one_year")
    private BigDecimal oneYear;

    @ColumnDefault("0")
    @Column(name = "three_years")
    private BigDecimal threeYears;

    @ColumnDefault("0")
    @Column(name = "five_years")
    private BigDecimal fiveYears;

    @ColumnDefault("0")
    @Column(name = "max")
    private BigDecimal max;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "symbol_id")
    private Symbol symbol;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public BigDecimal getYtd() {
        return ytd;
    }

    public void setYtd(BigDecimal ytd) {
        this.ytd = ytd;
    }

    public BigDecimal getOneMonth() {
        return oneMonth;
    }

    public void setOneMonth(BigDecimal oneMonth) {
        this.oneMonth = oneMonth;
    }

    public BigDecimal getThreeMonths() {
        return threeMonths;
    }

    public void setThreeMonths(BigDecimal threeMonths) {
        this.threeMonths = threeMonths;
    }

    public BigDecimal getSixMonth() {
        return sixMonth;
    }

    public void setSixMonth(BigDecimal sixMonth) {
        this.sixMonth = sixMonth;
    }

    public BigDecimal getOneYear() {
        return oneYear;
    }

    public void setOneYear(BigDecimal oneYear) {
        this.oneYear = oneYear;
    }

    public BigDecimal getThreeYears() {
        return threeYears;
    }

    public void setThreeYears(BigDecimal threeYears) {
        this.threeYears = threeYears;
    }

    public BigDecimal getFiveYears() {
        return fiveYears;
    }

    public void setFiveYears(BigDecimal fiveYears) {
        this.fiveYears = fiveYears;
    }

    public BigDecimal getMax() {
        return max;
    }

    public void setMax(BigDecimal max) {
        this.max = max;
    }

    public Symbol getSymbol() {
        return symbol;
    }

    public void setSymbol(Symbol symbol) {
        this.symbol = symbol;
    }

}

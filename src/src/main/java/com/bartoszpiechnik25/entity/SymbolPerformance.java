package com.bartoszpiechnik25.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.ColumnDefault;

import java.math.BigDecimal;

@Entity
@Table(name = "symbol_performance")
public class SymbolPerformance {
    @Id
    @ColumnDefault("nextval('symbol_performance_performance_id_seq'")
    @Column(name = "performance_id", nullable = false)
    private Integer id;

    @ColumnDefault("0")
    @Column(name = "ytd", precision = 38, scale = 2)
    private BigDecimal ytd;

    @ColumnDefault("0")
    @Column(name = "one_month", precision = 38, scale = 2)
    private BigDecimal oneMonth;

    @ColumnDefault("0")
    @Column(name = "three_months", precision = 38, scale = 2)
    private BigDecimal threeMonths;

    @ColumnDefault("0")
    @Column(name = "six_month", precision = 38, scale = 2)
    private BigDecimal sixMonth;

    @ColumnDefault("0")
    @Column(name = "one_year", precision = 38, scale = 2)
    private BigDecimal oneYear;

    @ColumnDefault("0")
    @Column(name = "three_years", precision = 38, scale = 2)
    private BigDecimal threeYears;

    @ColumnDefault("0")
    @Column(name = "five_years", precision = 38, scale = 2)
    private BigDecimal fiveYears;

    @ColumnDefault("0")
    @Column(name = "max", precision = 38, scale = 2)
    private BigDecimal max;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "symbol_id")
    private Symbol symbol;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
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

package entity;

import jakarta.persistence.*;
import org.hibernate.annotations.ColumnDefault;

import java.util.UUID;

@Entity
@Table(name = "stock")
public class Stock {
    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ColumnDefault("uuid_generate_v4()")
    @Column(name = "stock_id", nullable = false)
    private UUID id;

    @Column(name = "stock_name", nullable = false, length = Integer.MAX_VALUE)
    private String stockName;

    @Column(name = "business_summary", length = Integer.MAX_VALUE)
    private String businessSummary;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "symbol_id", nullable = false)
    private Symbol symbol;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "industry_id", nullable = false)
    private StockIndustry industry;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "sector_id", nullable = false)
    private StockSector sector;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getStockName() {
        return stockName;
    }

    public void setStockName(String stockName) {
        this.stockName = stockName;
    }

    public String getBusinessSummary() {
        return businessSummary;
    }

    public void setBusinessSummary(String businessSummary) {
        this.businessSummary = businessSummary;
    }

    public Symbol getSymbol() {
        return symbol;
    }

    public void setSymbol(Symbol symbol) {
        this.symbol = symbol;
    }

    public StockIndustry getIndustry() {
        return industry;
    }

    public void setIndustry(StockIndustry industry) {
        this.industry = industry;
    }

    public StockSector getSector() {
        return sector;
    }

    public void setSector(StockSector sector) {
        this.sector = sector;
    }

}

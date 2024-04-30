package entity;

import jakarta.persistence.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.Map;
import java.util.UUID;

@Entity
@Table(name = "etf")
public class Etf {
    @Id
    @ColumnDefault("uuid_generate_v4()")
    @Column(name = "etf_id", nullable = false)
    private UUID id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "symbol_id")
    private Symbol symbol;

    @Column(name = "isin", length = 30)
    private String isin;

    @Column(name = "name", nullable = false, length = 64)
    private String name;

    @ColumnDefault("0")
    @Column(name = "total_assets", nullable = false)
    private Integer totalAssets;

    @Column(name = "description", length = Integer.MAX_VALUE)
    private String description;

    @Column(name = "holdings")
    @JdbcTypeCode(SqlTypes.JSON)
    private Map<String, Object> holdings;

    @Column(name = "weights")
    @JdbcTypeCode(SqlTypes.JSON)
    private Map<String, Object> weights;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public Symbol getSymbol() {
        return symbol;
    }

    public void setSymbol(Symbol symbol) {
        this.symbol = symbol;
    }

    public String getIsin() {
        return isin;
    }

    public void setIsin(String isin) {
        this.isin = isin;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getTotalAssets() {
        return totalAssets;
    }

    public void setTotalAssets(Integer totalAssets) {
        this.totalAssets = totalAssets;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Map<String, Object> getHoldings() {
        return holdings;
    }

    public void setHoldings(Map<String, Object> holdings) {
        this.holdings = holdings;
    }

    public Map<String, Object> getWeights() {
        return weights;
    }

    public void setWeights(Map<String, Object> weights) {
        this.weights = weights;
    }

}

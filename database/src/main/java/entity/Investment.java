package entity;

import jakarta.persistence.*;
import org.hibernate.annotations.ColumnDefault;

import java.math.BigDecimal;
import java.time.OffsetDateTime;

@Entity
@Table(name = "investment")
public class Investment {
    @Id
    @ColumnDefault("nextval('investment_investment_id_seq'")
    @Column(name = "investment_id", nullable = false)
    private Long id;

    @Column(name = "open_price", nullable = false)
    private BigDecimal openPrice;

    @Column(name = "close_price")
    private BigDecimal closePrice;

    @Column(name = "acquired_at", nullable = false)
    private OffsetDateTime acquiredAt;

    @Column(name = "closed_at")
    private OffsetDateTime closedAt;

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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BigDecimal getOpenPrice() {
        return openPrice;
    }

    public void setOpenPrice(BigDecimal openPrice) {
        this.openPrice = openPrice;
    }

    public BigDecimal getClosePrice() {
        return closePrice;
    }

    public void setClosePrice(BigDecimal closePrice) {
        this.closePrice = closePrice;
    }

    public OffsetDateTime getAcquiredAt() {
        return acquiredAt;
    }

    public void setAcquiredAt(OffsetDateTime acquiredAt) {
        this.acquiredAt = acquiredAt;
    }

    public OffsetDateTime getClosedAt() {
        return closedAt;
    }

    public void setClosedAt(OffsetDateTime closedAt) {
        this.closedAt = closedAt;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Currency getCurrencyName() {
        return currencyName;
    }

    public void setCurrencyName(Currency currencyName) {
        this.currencyName = currencyName;
    }

    public BigDecimal getVolume() {
        return volume;
    }

    public void setVolume(BigDecimal volume) {
        this.volume = volume;
    }

    public Symbol getSymbol() {
        return symbol;
    }

    public void setSymbol(Symbol symbol) {
        this.symbol = symbol;
    }

}

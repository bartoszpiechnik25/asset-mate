package entity;

import jakarta.persistence.*;
import org.hibernate.annotations.ColumnDefault;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "investment")
public class Investment {
    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ColumnDefault("uuid_generate_v4()")
    @Column(name = "investment_id", nullable = false)
    private UUID id;

    @Column(name = "open_price", nullable = false)
    private BigDecimal openPrice;

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

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public BigDecimal getOpenPrice() {
        return openPrice;
    }

    public void setOpenPrice(BigDecimal openPrice) {
        this.openPrice = openPrice;
    }

    public OffsetDateTime getAcquiredAt() {
        return acquiredAt;
    }

    public void setAcquiredAt(OffsetDateTime acquiredAt) {
        this.acquiredAt = acquiredAt;
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

/*
 TODO [Reverse Engineering] create field to map the 'transaction_type' column
 Available actions: Define target Java type | Uncomment as is | Remove column mapping
    @ColumnDefault("buy")
    @Column(name = "transaction_type", columnDefinition = "transaction_type not null")
    private Object transactionType;
*/
}

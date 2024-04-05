package entity;

import jakarta.persistence.*;

@Entity
@Table(name = "cryptocurrency")
public class Cryptocurrency {
    @Id
    @Column(name = "crypto_id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "symbol_id", nullable = false)
    private Symbol symbol;

    @Column(name = "crypto_symbol", nullable = false, length = Integer.MAX_VALUE)
    private String cryptoSymbol;

    @Column(name = "description", nullable = false, length = Integer.MAX_VALUE)
    private String description;

    @Column(name = "name", length = Integer.MAX_VALUE)
    private String name;

    @Column(name = "gecko_id", nullable = false, length = Integer.MAX_VALUE)
    private String geckoId;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Symbol getSymbol() {
        return symbol;
    }

    public void setSymbol(Symbol symbol) {
        this.symbol = symbol;
    }

    public String getCryptoSymbol() {
        return cryptoSymbol;
    }

    public void setCryptoSymbol(String cryptoSymbol) {
        this.cryptoSymbol = cryptoSymbol;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getGeckoId() {
        return geckoId;
    }

    public void setGeckoId(String geckoId) {
        this.geckoId = geckoId;
    }

}
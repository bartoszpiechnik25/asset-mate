package entity;

import jakarta.persistence.*;

@Entity
@Table(name = "cryptocurrency_wth_category")
public class CryptocurrencyWthCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cwc_id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "crypto_id", nullable = false)
    private Cryptocurrency crypto;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "category_id", nullable = false)
    private CryptocurrencyCategory category;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Cryptocurrency getCrypto() {
        return crypto;
    }

    public void setCrypto(Cryptocurrency crypto) {
        this.crypto = crypto;
    }

    public CryptocurrencyCategory getCategory() {
        return category;
    }

    public void setCategory(CryptocurrencyCategory category) {
        this.category = category;
    }

}

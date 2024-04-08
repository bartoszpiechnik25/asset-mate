package entity;

import jakarta.persistence.*;
import org.hibernate.annotations.ColumnDefault;

@Entity
@Table(name = "symbol")
public class Symbol {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ColumnDefault("nextval('symbol_id_seq'")
    @Column(name = "symbol_id", nullable = false)
    private Integer id;

    @Column(name = "yahoo_symbol", nullable = false, length = Integer.MAX_VALUE)
    private String yahooSymbol;

    @Column(name = "instrument_type_id", nullable = false)
    private Integer instrumentTypeId;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getYahooSymbol() {
        return yahooSymbol;
    }

    public void setYahooSymbol(String yahooSymbol) {
        this.yahooSymbol = yahooSymbol;
    }

    public Integer getInstrumentTypeId() {
        return instrumentTypeId;
    }

    public void setInstrumentTypeId(Integer instrumentTypeId) {
        this.instrumentTypeId = instrumentTypeId;
    }

}

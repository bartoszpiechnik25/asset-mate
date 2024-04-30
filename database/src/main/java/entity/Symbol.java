package entity;

import jakarta.persistence.*;
import org.hibernate.annotations.ColumnDefault;

import java.util.UUID;

@Entity
@Table(name = "symbol")
public class Symbol {
    @Id
    @ColumnDefault("uuid_generate_v4()")
    @Column(name = "symbol_id", nullable = false)
    private UUID id;

    @Column(name = "yahoo_symbol", nullable = false, length = 15)
    private String yahooSymbol;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "instrument_type_id", nullable = false)
    private InstrumentType instrumentType;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getYahooSymbol() {
        return yahooSymbol;
    }

    public void setYahooSymbol(String yahooSymbol) {
        this.yahooSymbol = yahooSymbol;
    }

    public InstrumentType getInstrumentType() {
        return instrumentType;
    }

    public void setInstrumentTypeId(InstrumentType instrumentType) {
        this.instrumentType = instrumentType;
    }

}

package entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import org.hibernate.annotations.ColumnDefault;

@Entity
@Table(name = "instrument_type")
public class InstrumentType {
    @Id
    @ColumnDefault("nextval('instrument_type_instrument_type_id_seq'")
    @Column(name = "instrument_type_id", nullable = false)
    private Short id;

    @Column(name = "instrument_type_name", nullable = false, length = Integer.MAX_VALUE)
    private String instrumentTypeName;

    public Short getId() {
        return id;
    }

    public void setId(Short id) {
        this.id = id;
    }

    public String getInstrumentTypeName() {
        return instrumentTypeName;
    }

    public void setInstrumentTypeName(String instrumentTypeName) {
        this.instrumentTypeName = instrumentTypeName;
    }

}

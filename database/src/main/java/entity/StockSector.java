package entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import org.hibernate.annotations.ColumnDefault;

@Entity
@Table(name = "stock_sector")
public class StockSector {
    @Id
    @ColumnDefault("nextval('stock_sector_sector_id_seq'")
    @Column(name = "sector_id", nullable = false)
    private Short id;

    @Column(name = "sector_name", nullable = false, length = Integer.MAX_VALUE)
    private String sectorName;

    public Short getId() {
        return id;
    }

    public void setId(Short id) {
        this.id = id;
    }

    public String getSectorName() {
        return sectorName;
    }

    public void setSectorName(String sectorName) {
        this.sectorName = sectorName;
    }

}

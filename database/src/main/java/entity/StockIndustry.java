package entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import org.hibernate.annotations.ColumnDefault;

@Entity
@Table(name = "stock_industry")
public class StockIndustry {
    @Id
    @ColumnDefault("nextval('stock_industry_industry_id_seq'")
    @Column(name = "industry_id", nullable = false)
    private Short id;

    @Column(name = "industry_name", length = Integer.MAX_VALUE)
    private String industryName;

    public Short getId() {
        return id;
    }

    public void setId(Short id) {
        this.id = id;
    }

    public String getIndustryName() {
        return industryName;
    }

    public void setIndustryName(String industryName) {
        this.industryName = industryName;
    }

}

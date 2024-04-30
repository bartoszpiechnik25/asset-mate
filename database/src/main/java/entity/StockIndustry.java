package entity;

import jakarta.persistence.*;
import org.hibernate.Internal;
import org.hibernate.annotations.ColumnDefault;

@Entity
@Table(name = "stock_industry")
public class StockIndustry {
    @Id
//    @ColumnDefault("nextval('stock_industry_industry_id_seq'")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "industry_id", nullable = false)
    private Integer id;

    @Column(name = "industry_name", length = 64)
    private String industryName;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getIndustryName() {
        return industryName;
    }

    public void setIndustryName(String industryName) {
        this.industryName = industryName;
    }

}

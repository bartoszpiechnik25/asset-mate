package com.bartoszpiechnik25.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import org.hibernate.annotations.ColumnDefault;

@Entity
@Table(name = "cryptocurrency_category")
public class CryptocurrencyCategory {
    @Id
    @ColumnDefault("nextval('cryptocurrency_category_category_id_seq'")
    @Column(name = "category_id", nullable = false)
    private Short id;

    @Column(name = "category_name", nullable = false, length = Integer.MAX_VALUE)
    private String categoryName;

    public Short getId() {
        return id;
    }

    public void setId(Short id) {
        this.id = id;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

}

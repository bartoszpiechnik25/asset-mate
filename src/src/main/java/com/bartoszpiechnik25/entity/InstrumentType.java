package com.bartoszpiechnik25.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.ColumnDefault;

@Entity
@Table(name = "instrument_type")
public class InstrumentType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "instrument_type_id", nullable = false)
    private Integer id;

    @Column(name = "instrument_type_name", nullable = false, length = 64)
    private String instrumentTypeName;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getInstrumentTypeName() {
        return instrumentTypeName;
    }

    public void setInstrumentTypeName(String instrumentTypeName) {
        this.instrumentTypeName = instrumentTypeName;
    }

}

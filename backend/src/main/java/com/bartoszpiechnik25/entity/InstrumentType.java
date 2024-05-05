package com.bartoszpiechnik25.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "instrument_type")
public class InstrumentType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "instrument_type_id", nullable = false)
    private Integer id;

    @Column(name = "instrument_type_name", nullable = false, length = 64)
    private String instrumentTypeName;
}

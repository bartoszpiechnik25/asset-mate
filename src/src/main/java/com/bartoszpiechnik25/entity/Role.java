package com.bartoszpiechnik25.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import org.hibernate.annotations.ColumnDefault;

@Entity
@Table(name = "role")
public class Role {
    @Id
    @ColumnDefault("nextval('roles_role_id_seq'")
    @Column(name = "role_id", nullable = false)
    private Short id;

    @Column(name = "name", nullable = false, length = Integer.MAX_VALUE)
    private String name;

    public Short getId() {
        return id;
    }

    public void setId(Short id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

}

package com.bartoszpiechnik25.assetmate.api.v1.repository;

import com.bartoszpiechnik25.entity.InstrumentType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface InstrumentTypeRepository extends JpaRepository<InstrumentType, Integer> {
    Optional<InstrumentType> getInstrumentTypeByInstrumentTypeName(String instrumentTypeName);
}

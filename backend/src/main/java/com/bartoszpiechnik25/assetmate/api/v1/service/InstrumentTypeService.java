package com.bartoszpiechnik25.assetmate.api.v1.service;

import com.bartoszpiechnik25.assetmate.api.v1.dto.response.InstrumentTypesDto;
import com.bartoszpiechnik25.assetmate.api.v1.repository.InstrumentTypeRepository;
import com.bartoszpiechnik25.entity.InstrumentType;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class InstrumentTypeService {
    private final InstrumentTypeRepository repository;

    public List<InstrumentTypesDto> getAvailableTypes() {
        var types = repository.findAll();
        List<InstrumentTypesDto> result = new ArrayList<>();
        for (InstrumentType instrumentType: types) {
            result.add(new InstrumentTypesDto(instrumentType.getInstrumentTypeName()));
        }
        return result;
    }
}

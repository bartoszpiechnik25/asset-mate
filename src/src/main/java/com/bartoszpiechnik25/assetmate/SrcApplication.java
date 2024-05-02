package com.bartoszpiechnik25.assetmate;

import com.bartoszpiechnik25.assetmate.api.v1.repository.StockSectorRepository;
import com.bartoszpiechnik25.entity.StockSector;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@SpringBootApplication
@RestController
@EntityScan("com.bartoszpiechnik25.entity")
@EnableJpaRepositories("com.bartoszpiechnik25.assetmate.api.v1.repository")
public class SrcApplication {

	private final StockSectorRepository stockSectorRepository;

    public SrcApplication(StockSectorRepository stockSectorRepository) {
        this.stockSectorRepository = stockSectorRepository;
    }

    public static void main(String[] args) {
		SpringApplication.run(SrcApplication.class, args);
	}

	@GetMapping("/users")
	public String getUsers() {
		return "Hello";
	}

	@GetMapping("/stock/sectors")
	public String getStockSectors() {
		List<StockSector> sectorList = stockSectorRepository.findAll();
		return sectorList.getFirst().toString();
	}
}

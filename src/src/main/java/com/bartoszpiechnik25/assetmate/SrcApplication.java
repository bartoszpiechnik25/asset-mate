package com.bartoszpiechnik25.assetmate;

import com.bartoszpiechnik25.assetmate.repository.StockSectorRepository;
import com.bartoszpiechnik25.assetmate.repository.UserRepository;
import com.bartoszpiechnik25.entity.StockSector;
import com.bartoszpiechnik25.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@SpringBootApplication
@RestController
@EntityScan("com.bartoszpiechnik25.entity")
@EnableJpaRepositories("com.bartoszpiechnik25.assetmate.repository")
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

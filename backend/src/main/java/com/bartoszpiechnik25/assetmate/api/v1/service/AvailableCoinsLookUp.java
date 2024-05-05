package com.bartoszpiechnik25.assetmate.api.v1.service;

import com.bartoszpiechnik25.assetmate.api.v1.dto.response.ListCoinsDto;
import com.google.gson.Gson;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

@Service
public class AvailableCoinsLookUp {
    private Map<String, ListCoinsDto> coinsMap;

    @PostConstruct
    public void init() throws IOException, InterruptedException {
        HttpClient client = HttpClient.newHttpClient();

        var request = HttpRequest.newBuilder(
                        URI.create("https://api.coingecko.com/api/v3/coins/list")
                ).header("accept", "application/json")
                .header("x-cg-pro-api-key", "CG-eTPSx2eK16PvzbLwtAb7zq2P")
                .build();

        var response = client.send(request, HttpResponse.BodyHandlers.ofString());
        Gson parser = new Gson();
        ListCoinsDto[] coins = parser.fromJson(response.body(), ListCoinsDto[].class);
        coinsMap = Arrays.stream(coins)
                .collect(HashMap::new,
                        (map, coin) -> map.put(coin.getId(), coin),
                        HashMap::putAll
                );
    }
    public Map<String, ListCoinsDto> getCryptoMap() {
        return coinsMap;
    }

}

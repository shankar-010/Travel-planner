package com.example.travelplanner.service;

import com.example.travelplanner.dto.WeatherResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Service
public class WeatherService {

    @Value("${weather.api.key}")
    private String apiKey;

    public WeatherResponse getWeather(String city) {

        String url = "https://api.openweathermap.org/data/2.5/weather"
                + "?q=" + city
                + "&units=metric"
                + "&appid=" + apiKey;

        RestTemplate restTemplate = new RestTemplate();

        try {
            Map response = restTemplate.getForObject(url, Map.class);

            WeatherResponse weather = new WeatherResponse();
            weather.city = city;

            Map main = (Map) response.get("main");
            weather.temperature = ((Number) main.get("temp")).doubleValue();

            List weatherList = (List) response.get("weather");
            Map weatherObj = (Map) weatherList.get(0);

            weather.description = (String) weatherObj.get("description");
            weather.icon = (String) weatherObj.get("icon");

            return weather;

        } catch (Exception e) {
            throw new RuntimeException("Weather data not available for city: " + city);
        }
    }
}

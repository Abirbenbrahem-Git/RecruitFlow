package com.example.demo.config;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.addAllowedOrigin("*"); // Autoriser tous les domaines (à ajuster selon vos besoins)
        config.addAllowedMethod("*"); // Autoriser toutes les méthodes HTTP (GET, POST, PUT, DELETE, etc.)
        config.addAllowedHeader("*"); // Autoriser tous les en-têtes
        // Ajoutez votre en-tête personnalisé à autoriser
        config.addExposedHeader("access_token");
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}

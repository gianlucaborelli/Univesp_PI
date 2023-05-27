package com.pi1.sisgem.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
            .allowedOrigins("http://localhost:4200") // Defina a origem permitida
            .allowedMethods("GET", "POST", "PUT", "DELETE") // Defina os métodos HTTP permitidos
            .allowedHeaders("*") // Defina os cabeçalhos permitidos
            .allowCredentials(true); // Permitir credenciais (por exemplo, cookies)
    }
}
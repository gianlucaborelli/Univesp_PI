package com.sisgem.main.configuration;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class modalMapperConfig {
    
    @Bean
    public ModelMapper modelMapper(){
        return new ModelMapper();
    }

}

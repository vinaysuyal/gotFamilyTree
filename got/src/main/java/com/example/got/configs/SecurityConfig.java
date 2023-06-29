package com.example.got.configs;

import com.example.got.filters.jwtGeneration;
import com.example.got.filters.jwtValidation;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.Arrays;
import java.util.Collections;

@Configuration
public class SecurityConfig {
    @Bean
    public InMemoryUserDetailsManager userDetailsManager(){
        InMemoryUserDetailsManager inMemoryUserDetailsManager = new InMemoryUserDetailsManager();
        UserDetails admin = User.withUsername("rajeev").password("rajeev").authorities("admin").build();
        UserDetails user1 = User.withUsername("vedant").password("vedant").authorities("user").build();
        UserDetails user2 = User.withUsername("vishal").password("vishal").authorities("user").build();
        UserDetails user3 = User.withUsername("vivek").password("vivek").authorities("user").build();
        inMemoryUserDetailsManager.createUser(admin);
        inMemoryUserDetailsManager.createUser(user1);
        inMemoryUserDetailsManager.createUser(user2);
        inMemoryUserDetailsManager.createUser(user3);
        return inMemoryUserDetailsManager;
    }
    @Bean
    public PasswordEncoder passwordEncoder() {
        return NoOpPasswordEncoder.getInstance();
    }

    @Bean
    public SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception {
        http.csrf().disable();
        http.cors(corsCustomizer -> corsCustomizer.configurationSource(new CorsConfigurationSource() {
                    @Override
                    public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
                        CorsConfiguration config = new CorsConfiguration();
                        config.setAllowedOrigins(Collections.singletonList("http://localhost:3000"));
                        config.setAllowedMethods(Collections.singletonList("*"));
                        config.setAllowCredentials(true);
                        config.setAllowedHeaders(Collections.singletonList("*"));
                        config.setExposedHeaders(Arrays.asList("Authorization"));
                        config.setMaxAge(3600L);
                        return config;
                    }
                })).addFilterBefore(new jwtValidation(), BasicAuthenticationFilter.class).
                addFilterAfter( new jwtGeneration(), BasicAuthenticationFilter.class)
                .authorizeHttpRequests(request -> request
                        .requestMatchers("/api/characters/save").authenticated()
                        .requestMatchers("/api/characters/houses").authenticated()
                        .requestMatchers("/api/characters/familyTree/{houseName}").authenticated()
                        .requestMatchers("/api/characters/{id}/favourite").authenticated()
                        .requestMatchers("/api/characters/getFavourites").authenticated()
                        .requestMatchers("/auth/login").authenticated())
                .formLogin(Customizer.withDefaults()).httpBasic(Customizer.withDefaults());
        return http.build();
    }
}
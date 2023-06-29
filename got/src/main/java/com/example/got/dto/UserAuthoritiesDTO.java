package com.example.got.dto;

import lombok.Data;

import java.util.List;

@Data
public class UserAuthoritiesDTO {
    private String userName;
    private List<String> authorities;
    // Constructors, getters, and setters
}


package com.example.got.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

import java.util.List;
@Entity
@Data
public class Character {
    @Id
    private String name;

    private String actor;

    @ElementCollection
    private List<String> partners;

    @ElementCollection
    private List<String> children;

    @ElementCollection
    private List<String> killers;

    @ElementCollection
    @JsonIgnore
    private List<String> bookMarkers;
    @ElementCollection
    private List<String> house;

    private String imageUrl;
    private String thumbnailUrl;
    private boolean royal;
}

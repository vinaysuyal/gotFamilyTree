package com.example.got.Services;

import com.example.got.entities.Character;
import com.example.got.repositories.CharacterRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class CharacterService {
    @Autowired
    CharacterRepo characterRepo;
    public Iterable<Character> saveCharacters(List<Character> characters) {
        return characterRepo.saveAll(characters);
    }
    public List<String> getDistinctHouseList(){
        return characterRepo.findDistinctHouses();
    }
    public List<Character> getCharactersByHouseName (String name){
        return characterRepo.findByHouse(name);
    }
    public Character setUnsetFavourite(String id, boolean favourite) {
        var bookMarker = SecurityContextHolder.getContext().getAuthentication().getName();
        Character character = characterRepo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Character not found: " + id));
        if(!favourite)
        character.getBookMarkers().remove(bookMarker);
        else character.getBookMarkers().add(bookMarker);
        return characterRepo.save(character);
    }
    public List<Character> getFavouriteCharacters(){
        String bookMarker = SecurityContextHolder.getContext().getAuthentication().getName();
        return characterRepo.findAllByBookMarkersContaining(bookMarker);
    }
}

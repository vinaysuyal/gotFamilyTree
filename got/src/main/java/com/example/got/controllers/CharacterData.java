package com.example.got.controllers;

import com.example.got.Services.CharacterService;
import com.example.got.entities.Character;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/characters")
public class CharacterData {
    @Autowired
    CharacterService characterService;
    @PostMapping("/save")
    public ResponseEntity<String> getPostName(@RequestBody List<Character> characters){
        characterService.saveCharacters(characters);
        return ResponseEntity.ok("Realm Created Successfully");
    }

    @GetMapping("/houses")
    public List<String> getHouseList(){
        return characterService.getDistinctHouseList();
    }
    @GetMapping("/familyTree/{houseName}")
    public List<Character> getHouseList(@PathVariable String houseName){
        return characterService.getCharactersByHouseName(houseName);
    }
    @PutMapping("/{id}/favourite")
    public Character setUnsetFavourite(@PathVariable String id, @RequestParam boolean favourite){
        return characterService.setUnsetFavourite(id, favourite);
    }
    @GetMapping("/getFavourites")
    public List<Character> getFavourites(){
        return characterService.getFavouriteCharacters();
    }


}

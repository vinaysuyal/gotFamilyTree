package com.example.got.repositories;

import com.example.got.entities.Character;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CharacterRepo extends CrudRepository<Character, String> {
    @Query("SELECT DISTINCT c.house FROM Character c")
    List<String> findDistinctHouses();

    List<Character> findByHouse(String house);
    List<Character> findAllByBookMarkersContaining(String username);
}

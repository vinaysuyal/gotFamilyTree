package com.example.got.controllers;

import com.example.got.dto.UserAuthoritiesDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@Slf4j
@RequestMapping("/auth")
public class AuthController {
    @GetMapping(value = "/login")
    public UserAuthoritiesDTO getUserDataAfterLogin(){
        String userName = SecurityContextHolder.getContext().getAuthentication().getName();
        List<String> authorities = SecurityContextHolder.getContext().getAuthentication().getAuthorities()
                .stream()
                .map(Object::toString)
                .collect(Collectors.toList());
        UserAuthoritiesDTO userAuthoritiesDTO = new UserAuthoritiesDTO();
        userAuthoritiesDTO.setUserName(userName);
        userAuthoritiesDTO.setAuthorities(authorities);
        return userAuthoritiesDTO;
    }

}

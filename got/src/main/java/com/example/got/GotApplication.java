package com.example.got;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories("com.example.got.repositories")
public class GotApplication {

	public static void main(String[] args) {
		SpringApplication.run(GotApplication.class, args);
	}

}

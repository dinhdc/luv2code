package com.luv2code.be.controller;

import com.luv2code.be.service.CountryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/countries")
@CrossOrigin({"http://localhost:4200", "https://256wv.csb.app/"})
public class CountryController {

    @Autowired
    private CountryService countryService;

    @GetMapping
    public ResponseEntity<?> getListCountry(){
        return new ResponseEntity<>(countryService.getListCountry(), HttpStatus.OK);
    }
}

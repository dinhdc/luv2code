package com.luv2code.be.controller;

import com.luv2code.be.service.StateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin({"http://localhost:4200", "https://256wv.csb.app/"})
@RestController
@RequestMapping("/api/states")
public class StateController {

    @Autowired
    private StateService stateService;

    @GetMapping
    public ResponseEntity<?> getByCountryCode(@RequestParam("code") String code){
        return new ResponseEntity<>(stateService.findByCountryCode(code), HttpStatus.OK);
    }
}

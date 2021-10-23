package com.luv2code.be.service.imp;

import com.luv2code.be.entity.Country;
import com.luv2code.be.repository.CountryRepository;
import com.luv2code.be.service.CountryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class CountryServiceIMP implements CountryService {

    @Autowired
    private CountryRepository countryRepository;

    @Override
    public List<Country> getListCountry() {
        return this.countryRepository.findAll();
    }
}

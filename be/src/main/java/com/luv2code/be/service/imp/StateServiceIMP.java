package com.luv2code.be.service.imp;

import com.luv2code.be.entity.Country;
import com.luv2code.be.entity.State;
import com.luv2code.be.repository.CountryRepository;
import com.luv2code.be.repository.StateRepository;
import com.luv2code.be.service.StateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
@Service
public class StateServiceIMP implements StateService {

    @Autowired
    private StateRepository stateRepository;

    @Autowired
    private CountryRepository countryRepository;

    @Override
    public List<State> findByCountryCode(String code) {

        List<Country> countries = this.countryRepository.findAll()
                .stream().filter(c -> c.getCode().equals(code)).collect(Collectors.toList());
        Country country = countries.get(0);
        List<State> states = this.stateRepository.findAll().stream().
                filter(s -> s.getCountry().equals(country)).collect(Collectors.toList());
        return states;
    }
}

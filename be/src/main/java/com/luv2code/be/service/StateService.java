package com.luv2code.be.service;

import com.luv2code.be.entity.State;
import org.springframework.stereotype.Service;

import java.util.List;

public interface StateService {
    List<State> findByCountryCode(String code);
}

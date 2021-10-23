package com.luv2code.be.repository;

import com.luv2code.be.entity.State;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:4200")
@Repository
public interface StateRepository extends JpaRepository<State, Integer> {
}

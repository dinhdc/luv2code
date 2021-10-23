package com.luv2code.be.service.imp;

import com.luv2code.be.entity.Category;
import com.luv2code.be.repository.CategoryRepository;
import com.luv2code.be.service.CategoryService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceIMP implements CategoryService {

    @Autowired
    private ModelMapper mapper;

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public List<Category> getCategoryList() {
        return this.categoryRepository.findAll();
    }


}

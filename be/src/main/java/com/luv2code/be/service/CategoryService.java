package com.luv2code.be.service;

import com.luv2code.be.dto.CategoryDTO;
import com.luv2code.be.entity.Category;
import com.luv2code.be.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public List<CategoryDTO> getCategoryList(){
        List<Category> categories = this.categoryRepository.findAll();
        List<CategoryDTO> categoryDTOList = new ArrayList<CategoryDTO>();
        for (Category p: categories) {
            categoryDTOList.add(new CategoryDTO(p));
        };
        return categoryDTOList;
    }
}

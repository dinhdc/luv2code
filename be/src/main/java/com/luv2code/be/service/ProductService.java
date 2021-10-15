package com.luv2code.be.service;

import com.luv2code.be.dto.ProductDTO;
import com.luv2code.be.entity.Product;
import com.luv2code.be.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public List<ProductDTO> getProductList(){
        List<Product> products = this.productRepository.findAll();
        List<ProductDTO> productDTOList = new ArrayList<ProductDTO>();
        for (Product p: products) {
            productDTOList.add(new ProductDTO(p));
        };
        return productDTOList;
    }

    public ProductDTO getProduct(int id){
        return new ProductDTO(this.productRepository.findById(id).orElse(null));
    }

    public List<ProductDTO> getProductsByCategory(int category){
        List<ProductDTO> productDTOList = this.getProductList();
        productDTOList.removeIf(productDTO -> {
            return productDTO.getCategory() != category;
        });
        return productDTOList;
    }

    public List<ProductDTO> getProductsByKeyword(String key){
        List<ProductDTO> productDTOList = this.getProductList();
        // upper case
        String uKey = key.toUpperCase();
        // lower case
        String lKey = key.toLowerCase();
        // upper first character
        String fKey = key.substring(0,1).toUpperCase() + key.substring(1).toLowerCase();
        productDTOList.removeIf(productDTO -> {
            String name = productDTO.getName();
            return !(name.contains(key) || name.contains(uKey) || name.contains(lKey) || name.contains(fKey) );
        });
        return productDTOList;
    }

}

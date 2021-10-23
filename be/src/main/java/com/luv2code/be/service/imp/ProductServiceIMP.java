package com.luv2code.be.service.imp;

import com.luv2code.be.entity.Product;
import com.luv2code.be.repository.ProductRepository;
import com.luv2code.be.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductServiceIMP implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    public List<Product> getProductList(){
        List<Product> products = this.productRepository.findAll();

        return products;
    }

    public Product getProduct(int id){
        return this.productRepository.findById(id).orElse(null);
    }

    public List<Product> getProductsByCategory(int category){
       return this.productRepository.findAll()
               .stream().filter(p -> p.getCategory().getId() == category).collect(Collectors.toList());
    }

    public List<Product> getProductsByKeyword(String key){
       String keyLW = key.toLowerCase();
       return this.productRepository.findAll()
               .stream().filter(p -> p.getName().toLowerCase().contains(keyLW)).collect(Collectors.toList());
    }

}

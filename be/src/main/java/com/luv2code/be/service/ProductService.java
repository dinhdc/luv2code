package com.luv2code.be.service;

import com.luv2code.be.entity.Product;

import java.util.List;


public interface ProductService {

    List<Product> getProductList();

    Product getProduct(int id);

    List<Product> getProductsByCategory(int category);

    List<Product> getProductsByKeyword(String key);
}

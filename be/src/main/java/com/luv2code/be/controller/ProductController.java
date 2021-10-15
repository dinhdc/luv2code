package com.luv2code.be.controller;

import com.luv2code.be.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/products")
@CrossOrigin("http://localhost:4200")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping("")
    public ResponseEntity<?> getProducts(){
        return ResponseEntity.ok(this.productService.getProductList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getProduct(@PathVariable int id){
        return ResponseEntity.ok(this.productService.getProduct(id));
    }

    @GetMapping("/find")
    public ResponseEntity<?> getProductsByCategory(
            @RequestParam(value = "category", required = false) String category,
            @RequestParam(value = "keyword", required = false) String key){
        if(category != null) return ResponseEntity.ok(this.productService.getProductsByCategory(Integer.parseInt(category)));
        else return ResponseEntity.ok(this.productService.getProductsByKeyword(key));
    }
}

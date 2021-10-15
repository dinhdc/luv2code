package com.luv2code.be.dto;

import com.luv2code.be.entity.Product;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.Date;

@Getter
@Setter
public class ProductDTO implements Serializable {
    private static final long serialVersionUID = 2L;
    private int id;
    private String sku;
    private String name;
    private String description;
    private Float unitPrice;
    private String imageUrl;
    private Boolean active;
    private int unitsInStock;
    private Date dateCreated;
    private Date lastUpdated;
    private int category;

    public ProductDTO(Product product){
        this.id = product.getId();
        this.sku = product.getSku();
        this.description = product.getDescription();
        this.unitPrice = product.getUnitPrice();
        this.imageUrl = product.getImageUrl();
        this.active = product.getActive();
        this.unitsInStock = product.getUnitsInStock();
        this.dateCreated = product.getDateCreated();
        this.lastUpdated = product.getLastUpdated();
        this.category = product.getCategory().getId();
        this.name = product.getName();
    }
}

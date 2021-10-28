package com.luv2code.be.controller;

import com.luv2code.be.dto.Purchase;
import com.luv2code.be.dto.PurchaseResponse;
import com.luv2code.be.service.CheckoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/checkout")
public class CheckoutController {

    @Autowired
    private CheckoutService checkoutService;

    @PostMapping("/purchase")
    @CrossOrigin(origins = {"http://localhost:4200"})
    public PurchaseResponse placeOrder(@RequestBody Purchase purchase){
        PurchaseResponse purchaseResponse = this.checkoutService.placeOrder(purchase);
        return purchaseResponse;
    }
}

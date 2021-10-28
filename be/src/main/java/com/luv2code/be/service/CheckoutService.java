package com.luv2code.be.service;

import com.luv2code.be.dto.Purchase;
import com.luv2code.be.dto.PurchaseResponse;

public interface CheckoutService {

    PurchaseResponse placeOrder(Purchase purchase);
}

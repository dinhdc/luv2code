package com.luv2code.be.dto;

import com.luv2code.be.entity.Address;
import com.luv2code.be.entity.Customer;
import com.luv2code.be.entity.Order;
import com.luv2code.be.entity.OrderItem;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
public class Purchase {
    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private Set<OrderItem> orderItemSet;
}

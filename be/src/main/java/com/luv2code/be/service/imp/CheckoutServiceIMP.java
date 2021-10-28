package com.luv2code.be.service.imp;

import com.luv2code.be.dto.Purchase;
import com.luv2code.be.dto.PurchaseResponse;
import com.luv2code.be.entity.Customer;
import com.luv2code.be.entity.Order;
import com.luv2code.be.entity.OrderItem;
import com.luv2code.be.repository.CustomerRepository;
import com.luv2code.be.service.CheckoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Set;
import java.util.UUID;

@Service
@Transactional
public class CheckoutServiceIMP implements CheckoutService {

    @Autowired
    private CustomerRepository customerRepository;

    @Override
    public PurchaseResponse placeOrder(Purchase purchase) {

        // order
        Order order = purchase.getOrder();

        // tracking number
        String orderTrackingNumber = generateOrderTrackingNumber();
        order.setOrderTrackingNumber(orderTrackingNumber);

        // order item
        Set<OrderItem> orderItemSet = purchase.getOrderItemSet();
        if(orderItemSet != null){
            for (OrderItem item : orderItemSet) {
                order.addToOrder(item);
            }
        }

        // shipping and billing address
        order.setBillingAddress(purchase.getBillingAddress());
        order.setShippingAddress(purchase.getShippingAddress());

        // customer
        Customer customer = purchase.getCustomer();
        customer.add(order);

        // save
        customerRepository.save(customer);
        return new PurchaseResponse(orderTrackingNumber);
    }

    private String generateOrderTrackingNumber() {
        return UUID.randomUUID().toString();
    }
}

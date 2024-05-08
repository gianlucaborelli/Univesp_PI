package com.sisgem.main;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.sisgem.main.product.Product;
import com.sisgem.main.product.ProductRepository;
import com.sisgem.main.product.ProductService;
import com.sisgem.main.product.exceptions.ProductNotFoundException;
import com.sisgem.main.quotation.Quotation;
import com.sisgem.main.quotation.repository.QuotationRepository;

public class ProductServiceTest {

    @Mock
    private ProductRepository productRepository;
    
    @Mock
    private QuotationRepository quotationRepository;

    @InjectMocks
    private ProductService productService;

    @SuppressWarnings("deprecation")
    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testFindById() {
        UUID productId = UUID.randomUUID();
        Product product = new Product();
        product.setId(productId);

        when(productRepository.findById(productId)).thenReturn(Optional.of(product));

        assertEquals(product, productService.findById(productId));
    }

    @Test
    public void testFindById_ProductNotFound() {
        UUID productId = UUID.randomUUID();

        when(productRepository.findById(productId)).thenReturn(Optional.empty());

        assertThrows(ProductNotFoundException.class, () -> productService.findById(productId));
    }

    @Test
    public void testGetAvailableProducts() {
        Date initialDate = new Date();
        Date finalDate = new Date();
        List<Product> products = new ArrayList<>();
        List<Quotation> quotations = new ArrayList<>();

        when(productRepository.findAll()).thenReturn(products);
        when(quotationRepository.findByIntervalOfDates(initialDate, finalDate)).thenReturn(quotations);

        
    }

 


}
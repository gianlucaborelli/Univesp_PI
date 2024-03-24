package com.sisgem.main.product;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import com.sisgem.main.product.dto.AvailableProdutcsDto;

@RestController
@RequestMapping("/products")
public class ProductController {

    @Autowired
    private ProductRepository productsRepository;

    @Autowired
    private ProductService productService;

    @GetMapping
    public List<Product> listAll() {
        return productsRepository.findAll();
    }

    @GetMapping("/findByName")
    public ResponseEntity<List<Product>> findbyName(
            @RequestParam("name") String name) {

        return new ResponseEntity<List<Product>>(productsRepository.findByNameContaining(name), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public Optional<Product> findById(
            @NonNull @PathVariable UUID id) {
        return productsRepository.findById(id);
    }

    @GetMapping("/available-products")
    public ResponseEntity<List<AvailableProdutcsDto>> getAvailableProducts(
            @RequestParam("initialDate") @DateTimeFormat(pattern = "dd/MM/yyyy") Date initialDate,
            @RequestParam("finalDate") @DateTimeFormat(pattern = "dd/MM/yyyy") Date finalDate) {
                
        return new ResponseEntity<List<AvailableProdutcsDto>>(productService.getProdutosDisponiveis(initialDate, finalDate),
                HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Product> salveNewProduct(
            @NonNull @RequestBody Product product) {

        Product produtosalvo = productsRepository.save(product);
        return new ResponseEntity<>(produtosalvo, HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<Product> editProduct(
            @RequestBody Product product) {

        Product produtoSalvo = new Product();
        if (product.getId() != null) {
            produtoSalvo = productsRepository.save(product);
        }
        return new ResponseEntity<>(produtoSalvo, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public void excluir(
            @NonNull @PathVariable UUID id) {
                
        productsRepository.deleteById(id);        
    }
}

package com.sisgem.main.product;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import com.sisgem.main.product.converter.ProductMapper;
import com.sisgem.main.product.dto.ProductStockDto;
import com.sisgem.main.product.exceptions.InsufficientStockException;
import com.sisgem.main.product.exceptions.ProductNotFoundException;
import com.sisgem.main.quotation.Quotation;
import com.sisgem.main.quotation.QuotationRepository;
import com.sisgem.main.quotedProduct.QuotedProduct;

@Service
public class ProductService {
    
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private QuotationRepository quotationRepository;
    @Autowired
    private ProductMapper mapper;

    public Product findById (@NonNull UUID productId){
        return productRepository.findById(productId)
                .orElseThrow(() -> new ProductNotFoundException(productId));
    }

    public List<ProductStockDto> getAvailableProducts (Date initialDate, Date finalDate){
        var products = productRepository.findAll();

        var quotations = quotationRepository.findByIntervalOfDates(initialDate, finalDate);
        
        for(Quotation quotation : quotations){
            List<QuotedProduct> quotedProducts = quotation.getQuotedProducts();

            for(QuotedProduct quotedProduct : quotedProducts){
                Product produtoPedido = quotedProduct.getProduct();

                for(Product product: products){

                    if(product.getId() == produtoPedido.getId()){
                        product.setStock(product.getStock() - quotedProduct.getAmount());
                    }
                }
            }
        }
        
        return mapper.toAvailableProductStockList(products);    
    }
    
    public Boolean stockAvailable (Date initialData, Date finalData, Integer amount, UUID productId){
        var availableProductsList = getAvailableProducts(initialData, finalData);
        
        for (ProductStockDto availableProduct : availableProductsList) {
            if (availableProduct.getId().equals(productId)){

                if (availableProduct.getStock() < amount ){
                    throw new InsufficientStockException(amount, availableProduct.getName());
                }
                return true;
            }
        }

        throw new ProductNotFoundException(productId);
    }
}

package com.sisgem.main.quotedProduct;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import com.sisgem.main.infra.exceptions.ResourceNotFound;
import com.sisgem.main.product.Product;
import com.sisgem.main.product.ProductRepository;
import com.sisgem.main.product.ProductService;
import com.sisgem.main.quotation.QuotationRepository;
import com.sisgem.main.quotedProduct.converter.QuotedProductMapper;
import com.sisgem.main.quotedProduct.dto.addProdutoPedidoRequest;
import com.sisgem.main.quotedProduct.dto.produtoPedidoExisteDTO;
import com.sisgem.main.quotedProduct.dto.updateProdutoPedidoResponse;
import com.sisgem.main.quotation.Quotation;

import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;

@Service
public class QuotedProductService {
    @Autowired
    private QuotationRepository quotationRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private ProductService productService;
    @Autowired
    private QuotedProductRepository produtoPedidoRepositorio;
    @Autowired
    private EntityManager entityManager;
    @Autowired
    private QuotedProductMapper mapper;

    public ResponseEntity<Optional<List<QuotedProduct>>> findAllByQuotationId(UUID id) {
        return ResponseEntity.ok().body(this.produtoPedidoRepositorio.findAllByQuotation_Id(id));
    }

    public ResponseEntity<QuotedProduct> addProdutoPedido(addProdutoPedidoRequest addProduto) throws ResourceNotFound {

        Product product = productRepository.findById(addProduto.getProductId())
                .orElseThrow(() -> new ResourceNotFound(
                        String.format("Produto com ID %s não encontrado!", addProduto.getProductId())));

        Quotation quotation = quotationRepository.findById(addProduto.getQuotationId())
                .orElseThrow(() -> new ResourceNotFound(
                        String.format("Orçamento com ID %s não encontrado!", addProduto.getQuotationId())));

        productService.stockAvailable(quotation.getInitialDate(), quotation.getFinalDate(), addProduto.getAmount(),
                product.getId());

        entityManager.clear();

        QuotedProduct pedido = new QuotedProduct();

        pedido.setQuotation(quotation);
        pedido.setProduct(product);
        pedido.setAmount(addProduto.getAmount());
        pedido.setPrice(BigDecimal.valueOf(addProduto.getAmount()).multiply(product.getPrice()));

        produtoPedidoRepositorio.save(pedido);

        entityManager.clear();

        return ResponseEntity.ok().body(pedido);
    }

    @Transactional
    public ResponseEntity<updateProdutoPedidoResponse> updateProdutoPedido(
            QuotedProduct updatePedido)
            throws ResourceNotFound {

        QuotedProduct pedido = produtoPedidoRepositorio.findById(updatePedido.getId())
                .orElseThrow(() -> new ResourceNotFound(
                        String.format("Item pedido com ID %s não encontrado!", updatePedido.getId())));

        Quotation orcamento = pedido.getQuotation();
        Product produto = pedido.getProduct();

        productService.stockAvailable(orcamento.getInitialDate(), orcamento.getFinalDate(),
                updatePedido.getAmount(), produto.getId());

        pedido.setAmount(updatePedido.getAmount());
        pedido.setPrice(BigDecimal.valueOf(updatePedido.getAmount()).multiply(produto.getPrice()));

        produtoPedidoRepositorio.save(pedido);

        updateProdutoPedidoResponse update = mapper.toUpdateProdutoPedidoResponse(pedido);

        return ResponseEntity.ok().body(update);
    }

    public ResponseEntity<produtoPedidoExisteDTO> checkIfWasProdutoPedidoInOrcamento(
            @NonNull UUID orcamentoId,
            @NonNull UUID produtoId) 
                throws ResourceNotFound {

        Quotation quotation = quotationRepository.findById(orcamentoId)
                .orElseThrow(() -> new ResourceNotFound(
                        String.format("Orçamento com ID %s não encontrado!", orcamentoId)));

        for (QuotedProduct produto : quotation.getQuotedProducts()) {
            Product produtoExistente = produto.getProduct();
            if (produtoExistente.getId() == produtoId) {
                produtoPedidoExisteDTO update = mapper.toProdutoPedidoExiste(produto);
                return new ResponseEntity<produtoPedidoExisteDTO>(update, HttpStatus.OK);
            }
        }

        return new ResponseEntity<produtoPedidoExisteDTO>(new produtoPedidoExisteDTO(), HttpStatus.OK);
    }

    public ResponseEntity<Void> deleteProdutoPedido(
            @NonNull UUID id) throws ResourceNotFound {

        QuotedProduct pedido = produtoPedidoRepositorio.findById(id)
                .orElseThrow(() -> new ResourceNotFound(String.format("Item pedido com ID %s não encontrado!", id)));

        produtoPedidoRepositorio.delete(pedido);
        entityManager.clear();
        return ResponseEntity.ok().build();
    }
}

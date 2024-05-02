package com.sisgem.main.cart.implementation;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import com.sisgem.main.cartItem.CartItem;
import com.sisgem.main.cartItem.CartItemRepository;
import com.sisgem.main.cartItem.dto.AddCartItemDtoRequest;
import com.sisgem.main.address.Address;
import com.sisgem.main.address.AddressService;
import com.sisgem.main.authentication.AuthenticationService;
import com.sisgem.main.cart.Cart;
import com.sisgem.main.cart.CartRepository;
import com.sisgem.main.cart.CartService;
import com.sisgem.main.cart.converter.CartMapper;
import com.sisgem.main.cart.dto.CartDetailDto;
import com.sisgem.main.cart.exceptions.CartNotFoundException;
import com.sisgem.main.cart.exceptions.UserCartNotFoundException;
import com.sisgem.main.infra.exceptions.ResourceNotFound;
import com.sisgem.main.product.Product;
import com.sisgem.main.product.ProductService;
import com.sisgem.main.quotation.QuotationService;
import com.sisgem.main.user.User;
import com.sisgem.main.user.UserRepository;

@Service
@Scope("prototype")
public class CartServiceImplementation implements CartService {

    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private AuthenticationService authService;
    @Autowired
    private AddressService addressService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CartMapper mapper;
    @Autowired
    private ProductService productService;
    @Autowired
    private QuotationService quotationService;
    @Autowired
    private CartItemRepository cartItemRepository;

    @Override
    public List<CartDetailDto> findAll() {
        return mapper.toCartDetailList(cartRepository.findAll());
    }

    @Override
    public Cart findById(
            @NonNull UUID cartId){

        return cartRepository.findById(cartId)
                .orElseThrow(() -> new CartNotFoundException(cartId));
    }

    @Override
    public CartDetailDto findByUserId(UUID userId){
        return mapper.toCartDetail(cartRepository.findByUserId(userId)
                .orElseThrow(() -> new UserCartNotFoundException(userId)));
    }

    @Override
    public CartDetailDto loadCartByUser(
            @NonNull UUID userId)
            throws ResourceNotFound {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFound(
                        String.format("Usuário com ID %s não encontrado!", userId)));

        Cart cart = cartRepository.findByUserId(userId)
                .orElse(new Cart());

        cart.setUser(user);

        cart = cartRepository.save(cart);
        return mapper.toCartDetail(cart);
    }

    @Override
    public void deleteCart(
            @NonNull UUID cartId) {

        cartRepository.findById(cartId)
                .orElseThrow(() -> new CartNotFoundException(cartId));

        cartRepository.deleteById(cartId);
    }

    @Override
    public CartDetailDto setShippingAddress(
            @NonNull UUID cartId,
            @NonNull UUID addressId)
            throws ResourceNotFound {

        Cart cart = findById(cartId);

        Address address = addressService.findById(addressId);

        cart.setShippingAddress(address);
        cart = cartRepository.save(cart);
        return mapper.toCartDetail(cart);
    }    

    @Override
    public CartDetailDto setIntervalOfDate(
            Date initialDate,
            Date finalDate,
            @NonNull UUID cartId){           

        Cart cart = findById(cartId);

        if (!cart.getCartItens().isEmpty() ){
            for(CartItem item: cart.getCartItens()){                
                cartItemRepository.delete(item);
            }
            cart.deleteAllCartItem();
        }
        cart.setIntervalOfDate(initialDate, finalDate);

        cart = cartRepository.save(cart);

        return mapper.toCartDetail(cart);
    }

    @Override
    public CartDetailDto addOrUpdateItemToCart(@NonNull UUID cartId, AddCartItemDtoRequest itemToAdd) {

        Cart cart = findById(cartId);        

        cart.intervalOfDateIsValid();
        
        CartItem cartItem = cart.getCartItens()
                .stream()
                .filter(cartItens -> cartItens.getProduct().getId().equals(itemToAdd.productId()))
                .findFirst().orElse(null);                

        Product product = productService.findById(itemToAdd.productId());
        
        productService.stockAvailable(cart.getInitialDate(), cart.getFinalDate(), itemToAdd.amount(),
                product.getId());

        if (cartItem == null) {
            CartItem newItem = new CartItem();

            newItem.setCart(cart);
            newItem.setProduct(product);
            newItem.setAmount(itemToAdd.amount());
            newItem.setPrice(BigDecimal.valueOf(itemToAdd.amount()).multiply(product.getPrice()));

            cartItemRepository.save(newItem);
        }else{

            if(itemToAdd.amount() == 0){
                deleteItemToCart(cartItem);                
            }else{
                cartItem.setAmount(itemToAdd.amount());
                cartItemRepository.save(cartItem);
            }            
        }

        return mapper.toCartDetail(cartRepository.findById(cartId).get());
    }

    @Override
    public boolean finalizerCart(UUID cartId) throws ResourceNotFound{
        var userId = authService.getCurrentUserId();
        Cart cartToFinalizer = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new UserCartNotFoundException(userId));

        if (!cartToFinalizer.isValid()){
            return false;
        }

        quotationService.CreateQuotationByCart(cartToFinalizer);

        deleteCart(cartId);

        loadCartByUser(cartToFinalizer.getUser().getId());

        return true;
    }
    
    private void deleteItemToCart(CartItem cartItem) {
        cartItemRepository.delete(cartItem);        
    }

    @Override
    public CartDetailDto deleteItemToCart(@NonNull UUID cartItemId, @NonNull UUID cartId) {
        cartItemRepository.deleteById(cartItemId);
        return mapper.toCartDetail(cartRepository.findById(cartId).get());
    }

    @Override
    public void deleteCartByUser(User user) {
        cartRepository.deleteByUser(user);        
    }
}

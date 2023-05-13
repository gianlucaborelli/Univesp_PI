package com.pi1.sisgem.data;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pi1.sisgem.entity.ProdutoPedido;

public interface ProdutoPedidoRepositorio extends JpaRepository<ProdutoPedido,Long>{
    
}

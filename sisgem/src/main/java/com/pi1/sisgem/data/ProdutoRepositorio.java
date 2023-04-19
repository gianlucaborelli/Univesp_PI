package com.pi1.sisgem.data;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pi1.sisgem.entity.Produto;

public interface ProdutoRepositorio extends JpaRepository<Produto,Long>{
    
}

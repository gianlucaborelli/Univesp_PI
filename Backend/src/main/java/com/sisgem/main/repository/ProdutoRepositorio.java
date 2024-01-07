package com.sisgem.main.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sisgem.main.entity.Produto;

public interface ProdutoRepositorio extends JpaRepository<Produto,Long>{
    Optional<Produto> findById(Long id);
    List<Produto> findByNameContaining (String name);
}

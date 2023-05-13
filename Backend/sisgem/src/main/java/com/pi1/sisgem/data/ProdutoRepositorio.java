package com.pi1.sisgem.data;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pi1.sisgem.entity.Produto;

public interface ProdutoRepositorio extends JpaRepository<Produto,Long>{
    Optional<Produto> findById(Long id);
    List<Produto> findByNameContaining (String name);
}

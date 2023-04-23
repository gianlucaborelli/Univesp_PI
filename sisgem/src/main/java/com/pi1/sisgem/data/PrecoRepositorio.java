package com.pi1.sisgem.data;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pi1.sisgem.entity.Preco;

public interface PrecoRepositorio extends JpaRepository<Preco,Long> {
    
}

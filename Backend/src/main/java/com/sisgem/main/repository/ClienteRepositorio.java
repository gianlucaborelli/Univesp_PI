package com.sisgem.main.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sisgem.main.entity.Cliente;

public interface ClienteRepositorio extends JpaRepository<Cliente,Long> {
    
    List<Cliente> findByNameContaining (String name);

}

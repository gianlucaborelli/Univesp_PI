package com.pi1.sisgem.data;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pi1.sisgem.entity.Cliente;

public interface ClienteRepositorio extends JpaRepository<Cliente,Long> {
    
    List<Cliente> findByNameContaining (String name);

}

package com.pi1.sisgem.data;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pi1.sisgem.entity.Cliente;

public interface ClienteRepositorio extends JpaRepository<Cliente,Long> {
    

}

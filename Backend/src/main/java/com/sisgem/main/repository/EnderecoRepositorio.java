package com.sisgem.main.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.sisgem.main.entity.Endereco;

@Repository
public interface EnderecoRepositorio extends JpaRepository<Endereco, Long> {
    @Query("SELECT e FROM Endereco e WHERE e.cliente.id = :clienteId")
    List<Endereco> findByClienteId(@Param("clienteId") Long clienteId);
}

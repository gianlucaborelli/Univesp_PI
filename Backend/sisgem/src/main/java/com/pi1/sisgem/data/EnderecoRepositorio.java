package com.pi1.sisgem.data;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.pi1.sisgem.entity.Endereco;

@Repository
public interface EnderecoRepositorio extends JpaRepository<Endereco, Long> {
    @Query("SELECT e FROM Endereco e WHERE e.cliente.id = :clienteId")
    List<Endereco> findByClienteId(@Param("clienteId") Long clienteId);
}

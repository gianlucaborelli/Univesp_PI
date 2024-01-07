package com.sisgem.main.repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.sisgem.main.entity.Orcamento;

public interface OrcamentoRepositorio extends JpaRepository<Orcamento, Long> {    
    Optional<Orcamento> findById(Long id);

    @Query("SELECT o FROM Orcamento o WHERE o.dataInicio BETWEEN :dataInicio AND :dataFim OR o.dataFim BETWEEN :dataInicio AND :dataFim")
    List<Orcamento> findByIntervaloDeDatas(@Param("dataInicio") Date dataInicio, @Param("dataFim") Date dataFim);

    @Query("SELECT o FROM Orcamento o WHERE o.cliente.id = :clienteId")
    List<Orcamento> findAllByClienteId(@Param("clienteId") Long clienteId);
}

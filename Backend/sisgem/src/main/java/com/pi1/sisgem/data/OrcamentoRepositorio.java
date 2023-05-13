package com.pi1.sisgem.data;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.pi1.sisgem.entity.Orcamento;

public interface OrcamentoRepositorio extends JpaRepository<Orcamento, Long> {    
    Optional<Orcamento> findById(Long id);

    @Query("SELECT o FROM Orcamento o WHERE o.dataInicio BETWEEN :dataInicio AND :dataFim OR o.dataFim BETWEEN :dataInicio AND :dataFim")
    List<Orcamento> findByIntervaloDeDatas(@Param("dataInicio") Date dataInicio, @Param("dataFim") Date dataFim);
}

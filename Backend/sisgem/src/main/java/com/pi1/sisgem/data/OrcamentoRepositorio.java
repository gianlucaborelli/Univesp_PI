package com.pi1.sisgem.data;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.pi1.sisgem.entity.Orcamento;

public interface OrcamentoRepositorio extends JpaRepository<Orcamento, Long> {

    @Query("SELECT o FROM Orcamento o WHERE o.dataInicio BETWEEN :dataInicio AND :dataFim AND o.dataFim BETWEEN :dataInicio AND :dataFim")
    List<Orcamento> findByIntervaloDeDatas(@Param("dataInicio") Date dataInicio, @Param("dataFim") Date dataFim);
}

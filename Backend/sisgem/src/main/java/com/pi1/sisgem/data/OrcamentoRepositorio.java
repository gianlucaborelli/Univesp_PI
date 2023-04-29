package com.pi1.sisgem.data;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.pi1.sisgem.entity.Orcamento;

public interface OrcamentoRepositorio extends JpaRepository<Orcamento, Long> {

    @Query("Select * from Orcamento Where DataInicio between @dtInicio And @dtFim and DataFim between @dtInicio And @dtFim")
    List<Orcamento> findByIntervaloDeDatas(Date inicio, Date fim);

}

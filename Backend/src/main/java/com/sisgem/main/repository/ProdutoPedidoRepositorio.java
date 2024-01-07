package com.sisgem.main.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.sisgem.main.entity.ProdutoPedido;

public interface ProdutoPedidoRepositorio extends JpaRepository<ProdutoPedido,Long>{
    Optional<List<ProdutoPedido>> findAllByOrcamento_Id(Long orcamentoId);
}

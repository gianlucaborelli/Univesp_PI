package com.pi1.sisgem.data;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.pi1.sisgem.entity.ProdutoPedido;

public interface ProdutoPedidoRepositorio extends JpaRepository<ProdutoPedido,Long>{
    Optional<List<ProdutoPedido>> findAllByOrcamento_Id(Long orcamentoId);
}

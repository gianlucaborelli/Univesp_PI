package com.sisgem.main.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sisgem.main.entity.Usuario;

public interface UsuarioRepositorio extends JpaRepository<Usuario,Long> {
    
    List<Usuario> findByNameContaining (String name);

    Usuario findByLogin(String login);

}

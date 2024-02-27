package com.sisgem.main.user;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,UUID> {
    
    List<User> findByNameContaining (String name);
    Optional<User> findByEmail(String email);
    
}

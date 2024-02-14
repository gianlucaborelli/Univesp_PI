package com.sisgem.main.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.sisgem.main.entity.Usuario;
import com.sisgem.main.repository.UsuarioRepositorio;
import com.sisgem.main.repository.DTO.authentication.RegisterNewUserDto;
import com.sisgem.main.repository.Mapper.AuthenticationMapper;

@Service
public class AuthenticationService implements UserDetailsService{
    @Autowired
    private UsuarioRepositorio usuarioRepository;
    @Autowired
    private AuthenticationMapper mapper;

    @Override
    public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException {
        return usuarioRepository.findByLogin(username);
    }

    public Usuario registerNewUser(RegisterNewUserDto newUser) {
        newUser.setPassword(new BCryptPasswordEncoder().encode(newUser.getPassword()));
        return usuarioRepository.save(mapper.toNovoUsuario(newUser));
    }
}
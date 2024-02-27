package com.sisgem.main.authentication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.sisgem.main.authentication.converter.AuthenticationMapper;
import com.sisgem.main.authentication.dto.RegisterUserRequestDto;
import com.sisgem.main.infra.exceptions.UserAlreadyExistException;
import com.sisgem.main.user.UserRepository;
import com.sisgem.main.user.enums.Role;
import com.sisgem.main.user.User;

@Service
public class AuthenticationService implements UserDetailsService{
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AuthenticationMapper mapper;

    @Override
    public UserDetails loadUserByUsername(String userName)
            throws UsernameNotFoundException {
        return userRepository.findByEmail(userName).get();
    }

    public User registerUser(RegisterUserRequestDto newUser) throws UserAlreadyExistException {
        var isPresent = userRepository.findByEmail(newUser.getEmail()).isPresent();

        if(isPresent){
            throw new UserAlreadyExistException("Usuário já cadastrado!");
        }
        
        var userToSave = mapper.toNovoUsuario(newUser);

        userToSave.setRole(Role.ROLE_USER);

        userToSave.setPassword(new BCryptPasswordEncoder().encode(newUser.getPassword()));
        return userRepository.save(userToSave);
    }
}
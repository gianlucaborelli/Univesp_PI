package com.sisgem.main.authentication;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
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

    public UUID getCurrentUserId(){
        var principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();        
        return ((User) principal).getId();
    }

    public Role getCurrentUserRole(){
        var principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();        
        return ((User) principal).getRole();
    }

    public boolean currentUserIsAdmin(){
        var principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();        
        return ((User) principal).getRole() == Role.ROLE_ADMIN;
    }

    public boolean currentUserIsNotAdmin(){
               
        return !currentUserIsAdmin();
    }

    public User registerUser(RegisterUserRequestDto newUser) throws UserAlreadyExistException {
        var isPresent = userRepository.findByEmail(newUser.getEmail()).isPresent();

        if(isPresent){
            throw new UserAlreadyExistException(String.format("Usuário com email %s já cadastrado!", newUser.getEmail()));
        }
        
        var userToSave = mapper.toNovoUsuario(newUser);

        userToSave.setRole(Role.ROLE_USER);

        userToSave.setPassword(new BCryptPasswordEncoder().encode(newUser.getPassword()));
        return userRepository.save(userToSave);
    }    
}
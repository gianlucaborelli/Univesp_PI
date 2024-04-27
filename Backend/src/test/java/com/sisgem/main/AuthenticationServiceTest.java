package com.sisgem.main;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.sisgem.main.authentication.AuthenticationService;
import com.sisgem.main.authentication.converter.AuthenticationMapper;
import com.sisgem.main.authentication.dto.RegisterUserRequestDto;
import com.sisgem.main.infra.exceptions.UserAlreadyExistException;
import com.sisgem.main.user.User;
import com.sisgem.main.user.UserRepository;

@ExtendWith(MockitoExtension.class)
public class AuthenticationServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private AuthenticationMapper mapper;

    @InjectMocks
    private AuthenticationService authenticationService;

    @Test
    @DisplayName("Testando a função de Registro de Usuário com e-mail e senha.")
    public void testRegisterUser_UserAlreadyExists_ExceptionThrown() {

        // Criando um usuário e e-mail para usar no teste.
        RegisterUserRequestDto newUser = new RegisterUserRequestDto();
        newUser.setEmail("2107644@aluno.univesp.br");
        newUser.setPassword("minha_senha_secreta");

        when(userRepository.findByEmail(newUser.getEmail())).thenReturn(Optional.of(new User()));

        // Qaundo ... Então.
        assertThrows(UserAlreadyExistException.class, () -> authenticationService.registerUser(newUser));

        // Verificar se o método 'save' não foi chamado.
        verify(userRepository, never()).save(any(User.class));
    }

}

package com.sisgem.main;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import com.sisgem.main.authentication.dto.RegisterUserRequestDto;

public class RegisterUserTest {

    	/**
	 Testando registro de um novo usuário, foi usuado um e-mail válido,
     o e-mail institucional Univesp, e uma senha fictícia.
	 */
	@Test
    @DisplayName("Testando a função de Registro de Usuário com e-mail e senha.")
    public void testRegisterUser() {
        // Criar um objeto RegisterUserRequestDto para simular um novo usuário
        RegisterUserRequestDto newUser = new RegisterUserRequestDto();
        newUser.setEmail("2107644@aluno.univesp.br");
        newUser.setPassword("minha_senha_secreta");

    }


}

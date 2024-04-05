package com.sisgem.main;


import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import com.sisgem.main.address.AddressService;
import com.sisgem.main.address.dto.AutoCompleteAddressResponse;
import com.sisgem.main.authentication.dto.RegisterUserRequestDto;

@SpringBootTest
class MainApplicationTests {

	@Test
	void contextLoads() {
	}

    /**
	 Testando aplicação para validação de CEP
     foram usados três CEP válidos:
     1) Secretaria de Saúde de Ribeirão Preto
     2) Polo Univesp Ribeirão Preto
     3) Polo Univesp Sertãozinho
	 */
	@Test
    void testFindByCep() {
        // Criar uma instância de AddressService
        AddressService addressService = new AddressService();

        // Chamar o método findByCep com um CEP válido (Secretaria de Saúde de Ribeirão Preto)
        AutoCompleteAddressResponse smsribeirao = addressService.findByCep("14015100");

        // Verificar se o resultado não é nulo
        assertNotNull(smsribeirao);

        // Verificar se o CEP retornado é o esperado
        assertEquals("14015-100", smsribeirao.getCep());
        
	    // Chamar o método findByCep com um CEP válido (Polo Univesp Ribeirão Preto)
        AutoCompleteAddressResponse univespribeirao = addressService.findByCep("14010080");

        // Verificar se o resultado não é nulo
        assertNotNull(univespribeirao);

        // Verificar se o CEP retornado é o esperado
        assertEquals("14010-080", univespribeirao.getCep());

		// Chamar o método findByCep com um CEP válido (Polo Univesp Sertãozinho)
        AutoCompleteAddressResponse univespsertaozinho = addressService.findByCep("14010080");

        // Verificar se o resultado não é nulo
        assertNotNull(univespsertaozinho);

        // Verificar se o CEP retornado é o esperado
        assertEquals("14010-080", univespsertaozinho.getCep());

    }

	/**
	 Testando registro de um novo usuário, foi usuado um e-mail válido,
     o e-mail institucional Univesp, e uma senha fictícia.
	 */
	@Test
    void testRegisterUser() {
        // Criar um objeto RegisterUserRequestDto para simular um novo usuário
        RegisterUserRequestDto newUser = new RegisterUserRequestDto();
        newUser.setEmail("2107644@aluno.univesp.br");
        newUser.setPassword("minha_senha_secreta");

    }



}

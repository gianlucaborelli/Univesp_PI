package com.sisgem.main;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import com.sisgem.main.address.AddressService;
import com.sisgem.main.address.dto.AutoCompleteAddressResponse;

public class AddressServiceTest {

    @Test
	public void contextLoads() {
	}

    /**
	 Testando aplicação para validação de CEP
     foram usados três CEP válidos:
     1) Secretaria de Saúde de Ribeirão Preto (CEP 14015-100)
     2) Polo Univesp Ribeirão Preto (CEP 14010-080)
     3) Polo Univesp Sertãozinho (CEP 14010-080)
	 */
	@Test
    @DisplayName("Testando a função FindByCep que verifica se o CEP digitado é válido.")
    public void testFindByCep() {
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


}

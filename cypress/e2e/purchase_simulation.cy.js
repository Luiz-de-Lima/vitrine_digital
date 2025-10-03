// cypress/e2e/purchase_simulation.cy.js

describe('Simulação de Compra e Cálculo de Preço', () => {
    const initialPrice = 109.95; // O preço unitário do Produto 1 da Fake Store API

    beforeEach(() => {
        // Visita a página principal do aplicativo
        cy.visit('/');

        // Espera que o elemento exista (este comando retenta automaticamente)
        cy.get('[data-cy="total-price"]').should('exist');

        // Agora que ele existe, verifica se está visível
        cy.get('[data-cy="total-price"]').should('be.visible');
    });
    it('Deve iniciar a quantidade em 0 e incrementar o preço corretamente', () => {
        // 1. Verifica o estado inicial (Quantidade 0 e Preço 0.00)
        cy.get('[data-cy="quantity-display"]').should('contain', '0');
        cy.get('[data-cy="total-price"]').should('contain', '0.00');

        // 2. Ação: Clica no botão de incremento (+)
        cy.get('[data-cy="quantity-increment"]').click();

        // 3. Verificação (Quantidade = 1)
        cy.get('[data-cy="quantity-display"]').should('contain', '1');

        // Calcula o preço esperado para 1 item e verifica se o display está correto
        const expectedPrice1 = (initialPrice * 1).toFixed(2);
        cy.get('[data-cy="total-price"]').should('contain', expectedPrice1);

        // 4. Ação: Clica novamente no botão de incremento (+)
        cy.get('[data-cy="quantity-increment"]').click();

        // 5. Verificação (Quantidade = 2)
        cy.get('[data-cy="quantity-display"]').should('contain', '2');

        // Calcula o preço esperado para 2 itens e verifica se o display está correto
        const expectedPrice2 = (initialPrice * 2).toFixed(2);
        cy.get('[data-cy="total-price"]').should('contain', expectedPrice2);
    });

    it('Não deve permitir que a quantidade seja menor que 0', () => {
        // Garante que o estado inicial é 0
        cy.get('[data-cy="quantity-display"]').should('contain', '0');

        // Tenta decrementar quando já está em 0
        cy.get('[data-cy="quantity-decrement"]').click();

        // O display ainda deve ser 0
        cy.get('[data-cy="quantity-display"]').should('contain', '0');
        cy.get('[data-cy="total-price"]').should('contain', '0.00');
    });
});
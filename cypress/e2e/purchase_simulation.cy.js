// describe('Simulação de Compra e Cálculo de Preço', () => {
//   const initialPrice = 109.95; // preço unitário do Produto 1 da Fake Store API

//   beforeEach(() => {
//     cy.intercept('GET', 'https://fakestoreapi.com/products?limit=10').as('getProduct');

//     cy.visit('/');

//     // Espera a resposta da API
//     cy.wait('@getProduct');

//     // Aguarda o container de produtos renderizar
//     cy.get('[data-cy="product-catalog"]', { timeout: 10000 })
//       .should('have.length.greaterThan', 0);

//     // Agora garante que o botão "Comprar Agora" existe dentro de um card
//     cy.contains('button', 'Comprar Agora', { timeout: 10000 }).should('exist');

//     // Verifica o preço inicial
//    cy.get('[data-cy="total-price"]', { timeout: 8000 })
//       .should('have.text', '$0.00');
//   });

//   it('Deve iniciar a quantidade em 0 e incrementar o preço corretamente', () => {
//     cy.get('[data-cy="quantity-display"]').should('contain', '0');
//     cy.get('[data-cy="total-price"]').should('contain', '0.00');

//     cy.get('[data-cy="quantity-increment"]').click();
//     cy.get('[data-cy="quantity-display"]').should('contain', '1');
//     cy.get('[data-cy="total-price"]').should('contain', (initialPrice * 1).toFixed(2));

//     cy.get('[data-cy="quantity-increment"]').click();
//     cy.get('[data-cy="quantity-display"]').should('contain', '2');
//     cy.get('[data-cy="total-price"]').should('contain', (initialPrice * 2).toFixed(2));
//   });

//   it('Não deve permitir que a quantidade seja menor que 0', () => {
//     cy.get('[data-cy="quantity-display"]').should('contain', '0');
//     cy.get('[data-cy="quantity-decrement"]').click();
//     cy.get('[data-cy="quantity-display"]').should('contain', '0');
//     cy.get('[data-cy="total-price"]').should('contain', '0.00');
//   });
// });

// cypress/e2e/purchase_simulation.cy.js

describe('Simulação de Compra e Cálculo de Preço (Fluxo Modal)', () => {
  const initialPrice = 109.95; // Preço do Produto 1 para cálculo

  beforeEach(() => {
    // 1. Intercepta a chamada da API (para sincronizar)
    cy.intercept('GET', 'https://fakestoreapi.com/products?limit=10').as('getProducts');
    cy.visit('/');
    cy.wait('@getProducts', { timeout: 2000 }); // Garante que os dados do catálogo foram carregados
  });

  it('Deve abrir o modal, calcular o preço e confirmar a compra', () => {
    // 1. AÇÃO: Clica no botão 'Comprar' do PRIMEIRO produto para abrir o modal
    // O elemento [data-cy="total-price"] entra no DOM NESTE MOMENTO
    cy.contains('Comprar').first().click();
    cy.wait(500);
    // 2. SINCRONIZAÇÃO E VERIFICAÇÃO INICIAL: Espera o preço total aparecer
    // O preço inicial deve ser o preço base (109.95) * 1 (quantidade inicial)
    cy.get('[data-cy="total-price"]').should('be.visible');

    // 3. VERIFICAÇÃO DO PREÇO BASE (Quantidade = 1, Preço = 109.95)
    cy.get('[data-cy="quantity-display"]').should('contain', '1');
    cy.get('[data-cy="total-price"]').should('contain', initialPrice.toFixed(2));

    // 4. AÇÃO: Clica no botão de incremento (+)
    cy.get('[data-cy="quantity-increment"]').click();

    // 5. VERIFICAÇÃO (Quantidade = 2 e Preço Dobrado)
    cy.get('[data-cy="quantity-display"]').should('contain', '2');

    const expectedPrice = (initialPrice * 2).toFixed(2);
    cy.get('[data-cy="total-price"]').should('contain', `$${expectedPrice}`);



    // 6. AÇÃO FINAL: Simula o clique no botão de compra (dentro do modal)
    cy.get('[data-cy="buy-button"]').click();

    // 7. VERIFICAÇÃO DO MODAL DE SUCESSO
    cy.get('h2:contains("Pedido Concluído!")').should('be.visible');

    cy.get('button:contains("Fechar")').click();
    
    // 8. ASSERÇÃO FINAL: Verifica se o modal desapareceu do DOM
    // O comando should('not.exist') garante que o elemento foi removido da página
    cy.get('h2:contains("Pedido Concluído!")').should('not.exist');
  });
});
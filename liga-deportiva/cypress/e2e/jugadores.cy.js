describe('Flujo real de Jugadores (E2E)', () => {
  beforeEach(() => {
    cy.visit('/jugadores');   // ruta real de tu página
  });

  it('Un administrador accede a la lista de jugadores y se muestra correctamente', () => {
    cy.get('h2').should('contain', 'Jugadores');           // ajusta si tu título es distinto
    cy.get('table').should('exist');                       // o el elemento que contenga la lista
    cy.contains('Test Jugador').should('be.visible');      // nombre de prueba
  });

  it('Error controlado al crear jugador con datos inválidos', () => {
    // Si tienes formulario de creación (o simúlalo con botón)
    cy.get('button').contains('Nuevo Jugador').click();    // ajusta al botón real
    cy.get('input[name="nombre"]').type('');               // deja vacío
    cy.get('button[type="submit"]').click();
    cy.contains('El nombre es obligatorio').should('be.visible'); // mensaje de error real
  });
});
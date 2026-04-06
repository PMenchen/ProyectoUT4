/**
 * Tests de Integración del Componente Jugadores
 * 
 * Prueba la comunicación entre el componente y el servicio Database,
 * simulando peticiones HTTP mediante HttpClientTestingModule.
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Jugadores } from './jugadores';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Database } from '../../services/database';
import { Jugador } from '../../models/jugador.model';
import { Equipo } from '../../models/equipo.model';

describe('Jugadores (Componente de Integración)', () => {
  let component: Jugadores;
  let fixture: ComponentFixture<Jugadores>;
  let httpMock: HttpTestingController;

  // ==================== MOCK DATA ====================
  const mockJugadores: Partial<Jugador>[] = [
    {
      id: 1,
      nombre: 'Lionel Messi',
      posicion: 'Delantero',
      numero: 10,
      equipoId: 1,
      deporte: 'Fútbol',
      estadisticas: { partidosJugados: 50, goles: 35, asistencias: 20 }
    },
    {
      id: 2,
      nombre: 'Cristiano Ronaldo',
      posicion: 'Delantero',
      numero: 7,
      equipoId: 2,
      deporte: 'Fútbol',
      estadisticas: { partidosJugados: 45, goles: 40, asistencias: 10 }
    },
    {
      id: 3,
      nombre: 'LeBron James',
      posicion: 'Alero',
      numero: 23,
      equipoId: 3,
      deporte: 'Baloncesto',
      estadisticas: { partidosJugados: 60, puntos: 1500, rebotes: 400 }
    }
  ];

  const mockEquipos: Partial<Equipo>[] = [
    { id: 1, nombre: 'FC Barcelona', deporte: 'Fútbol' },
    { id: 2, nombre: 'Al-Nassr', deporte: 'Fútbol' },
    { id: 3, nombre: 'LA Lakers', deporte: 'Baloncesto' }
  ];

  // ==================== CONFIGURACIÓN ====================
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        Jugadores   // Componente standalone: va en imports
      ],
      providers: [Database]
    })
    // Override del template para tests unitarios (evita problemas con templateUrl)
    .overrideComponent(Jugadores, {
      set: {
        template: '<div></div>'
      }
    })
    .compileComponents();

    fixture = TestBed.createComponent(Jugadores);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock?.verify();
  });

  // ==================== TESTS DE CREACIÓN ====================
  
  it('deberia crear el componente correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('deberia inicializar con valores por defecto correctos', () => {
    expect(component.searchTerm).toBe('');
    expect(component.selectedJugador).toBeNull();
    expect(component.jugadores).toEqual([]);
    expect(component.equipos).toEqual([]);
    expect(component.cargando).toBe(true);
    expect(component.error).toBe('');
  });

  // ==================== TESTS DE CARGA DE DATOS ====================

  it('deberia llamar a cargarJugadores() y cargarEquipos() en ngOnInit', () => {
    spyOn(component, 'cargarJugadores');
    spyOn(component, 'cargarEquipos');
    
    component.ngOnInit();
    
    expect(component.cargarJugadores).toHaveBeenCalled();
    expect(component.cargarEquipos).toHaveBeenCalled();
  });

  it('deberia cargar jugadores correctamente con mock HTTP', () => {
    component.ngOnInit();

    // Responder a la petición de equipos
    const reqEquipos = httpMock.expectOne(req =>
      req.url.includes('/equipos') && req.method === 'GET'
    );
    reqEquipos.flush({ success: true, data: mockEquipos });

    // Responder a la petición de jugadores
    const reqJugadores = httpMock.expectOne(req =>
      req.url.includes('/jugadores') && req.method === 'GET'
    );
    expect(reqJugadores.request.headers.get('Content-Type')).toBe('application/json');
    reqJugadores.flush({ success: true, data: mockJugadores });

    // Verificar resultados
    expect(component.cargando).toBe(false);
    expect(component.jugadores.length).toBe(3);
    expect(component.jugadores[0].nombre).toBe('Lionel Messi');
    expect(component.error).toBe('');
  });

  it('deberia manejar errores al cargar jugadores', () => {
    component.ngOnInit();

    const reqEquipos = httpMock.expectOne(req => req.url.includes('/equipos'));
    reqEquipos.flush({ success: true, data: [] });

    const reqJugadores = httpMock.expectOne(req => req.url.includes('/jugadores'));
    reqJugadores.error(new ErrorEvent('Network error'));

    expect(component.cargando).toBe(false);
    expect(component.error).toContain('Error al cargar jugadores');
  });

  // ==================== TESTS DE FILTRADO ====================

  it('deberia filtrar jugadores por nombre', () => {
    component.jugadores = mockJugadores as Jugador[];
    component.equipos = mockEquipos as Equipo[];
    component.searchTerm = 'Messi';

    const filtered = component.filteredJugadores;

    expect(filtered.length).toBe(1);
    expect(filtered[0].nombre).toBe('Lionel Messi');
  });

  it('deberia filtrar jugadores por deporte', () => {
    component.jugadores = mockJugadores as Jugador[];
    component.equipos = mockEquipos as Equipo[];
    component.searchTerm = 'Baloncesto';

    const filtered = component.filteredJugadores;

    expect(filtered.length).toBe(1);
    expect(filtered[0].nombre).toBe('LeBron James');
  });

  it('deberia filtrar jugadores por posicion', () => {
    component.jugadores = mockJugadores as Jugador[];
    component.equipos = mockEquipos as Equipo[];
    component.searchTerm = 'Delantero';

    const filtered = component.filteredJugadores;

    expect(filtered.length).toBe(2);
  });

  it('deberia devolver todos los jugadores si searchTerm está vacío', () => {
    component.jugadores = mockJugadores as Jugador[];
    component.searchTerm = '';

    const filtered = component.filteredJugadores;

    expect(filtered.length).toBe(3);
  });

  it('deberia devolver array vacío si no hay coincidencias', () => {
    component.jugadores = mockJugadores as Jugador[];
    component.equipos = mockEquipos as Equipo[];
    component.searchTerm = 'JugadorInexistente';

    const filtered = component.filteredJugadores;

    expect(filtered.length).toBe(0);
  });

  // ==================== TESTS DE UTILIDADES ====================

  it('deberia obtener el icono correcto para cada deporte', () => {
    expect(component.getDeporteIcon('Fútbol')).toBe('fa-futbol');
    expect(component.getDeporteIcon('Baloncesto')).toBe('fa-basketball');
    expect(component.getDeporteIcon('Voleibol')).toBe('fa-volleyball');
    expect(component.getDeporteIcon('Balonmano')).toBe('fa-hand-fist');
    expect(component.getDeporteIcon('OtroDeporte')).toBe('fa-user');
  });

  it('deberia obtener el nombre del equipo correctamente', () => {
    component.equipos = mockEquipos as Equipo[];
    
    // Jugador con equipoId numérico
    const jugadorNumerico = { equipoId: 1 } as Jugador;
    expect(component.getNombreEquipo(jugadorNumerico)).toBe('FC Barcelona');
    
    // Jugador sin equipo
    const jugadorSinEquipo = { equipoId: null } as unknown as Jugador;
    expect(component.getNombreEquipo(jugadorSinEquipo)).toBe('Sin equipo');
  });

  it('deberia generar estadísticas display correctamente', () => {
    const jugadorFutbol = {
      estadisticas: {
        partidosJugados: 50,
        goles: 35,
        asistencias: 20,
        tarjetasAmarillas: 2,
        tarjetasRojas: 0
      }
    } as Jugador;

    const stats = component.getEstadisticasDisplay(jugadorFutbol);

    expect(stats).toContain('50 Partidos');
    expect(stats).toContain('35 Goles');
    expect(stats).toContain('20 Asistencias');
    expect(stats).toContain('2 T. Amarillas');
  });

  // ==================== TESTS DE MODAL ====================

  it('deberia seleccionar jugador al abrir modal', () => {
    const jugador = mockJugadores[0] as Jugador;
    
    // Simular que no hay bootstrap disponible
    component.openModal(jugador);
    
    expect(component.selectedJugador).toEqual(jugador);
  });
});

// database.spec.ts
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Database } from './database';
import { Jugador } from '../models/jugador.model';

describe('Database Service (modulo Jugadores)', () => {
  let service: Database;
  let httpMock: HttpTestingController;

  const mockJugadores: Jugador[] = [
    {
      id: 1,
      nombre: 'Lionel Messi',
      equipoId: 1,
      deporte: 'Futbol',
      numero: 10,
      posicion: 'Delantero',
      estadisticas: {
        partidosJugados: 50,
        goles: 35,
        asistencias: 20,
        tarjetasAmarillas: 2,
        tarjetasRojas: 0
      },
      foto: 'assets/jugadores/messi.jpg',
      createdAt: new Date('2024-01-15')
    },
    {
      id: 2,
      nombre: 'LeBron James',
      equipoId: 2,
      deporte: 'Baloncesto',
      numero: 23,
      posicion: 'Alero',
      estadisticas: {
        partidosJugados: 45,
        puntos: 1200,
        rebotes: 400,
        asistencias: 350,
        bloqueos: 50
      },
      foto: 'assets/jugadores/lebron.jpg',
      createdAt: new Date('2024-02-10')
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Database]
    });

    service = TestBed.inject(Database);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('deberia crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('deberia obtener todos los jugadores', () => {
    service.getJugadores().subscribe((jugadores) => {
      expect(jugadores.length).toBe(2);
      expect(jugadores).toEqual(mockJugadores);
      expect(jugadores[0].nombre).toBe('Lionel Messi');
      expect(jugadores[0].estadisticas.goles).toBe(35);
      expect(jugadores[1].deporte).toBe('Baloncesto');
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/jugadores`);
    expect(req.request.method).toBe('GET');
    req.flush(mockJugadores);
  });

  it('deberia crear un jugador de futbol', () => {
    const nuevoJugador: Jugador = {
      nombre: 'Kylian Mbappe',
      equipoId: 3,
      deporte: 'Futbol',
      numero: 7,
      posicion: 'Delantero',
      estadisticas: {
        partidosJugados: 0,
        goles: 0,
        asistencias: 0,
        tarjetasAmarillas: 0,
        tarjetasRojas: 0
      }
    };

    const mockResponse: Jugador = {
      id: 3,
      ...nuevoJugador,
      createdAt: new Date()
    };

    service.createJugador(nuevoJugador).subscribe((response) => {
      expect(response.id).toBe(3);
      expect(response.nombre).toBe('Kylian Mbappe');
      expect(response.deporte).toBe('Futbol');
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/jugadores`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body.nombre).toBe('Kylian Mbappe');
    expect(req.request.body.equipoId).toBe(3);
    req.flush(mockResponse);
  });

  it('deberia crear un jugador de baloncesto', () => {
    const nuevoJugador: Jugador = {
      nombre: 'Stephen Curry',
      equipoId: 4,
      deporte: 'Baloncesto',
      numero: 30,
      posicion: 'Base',
      estadisticas: {
        partidosJugados: 0,
        puntos: 0,
        rebotes: 0,
        asistencias: 0,
        bloqueos: 0
      }
    };

    const mockResponse: Jugador = {
      id: 4,
      ...nuevoJugador,
      createdAt: new Date()
    };

    service.createJugador(nuevoJugador).subscribe((response) => {
      expect(response.id).toBe(4);
      expect(response.estadisticas.puntos).toBe(0);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/jugadores`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('deberia manejar errores en getJugadores', (done) => {
    service.getJugadores().subscribe({
      next: () => {
        done.fail('Deberia haber fallado');
      },
      error: (error) => {
        expect(error.status).toBe(500);
        done();
      }
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/jugadores`);
    req.flush('Error del servidor', { status: 500, statusText: 'Server Error' });
  });

  it('deberia manejar errores en createJugador', (done) => {
    const nuevoJugador: Jugador = {
      nombre: 'Test Player',
      equipoId: 1,
      deporte: 'Futbol',
      estadisticas: {}
    };

    service.createJugador(nuevoJugador).subscribe({
      next: () => {
        done.fail('Deberia haber fallado');
      },
      error: (error) => {
        expect(error.status).toBe(400);
        done();
      }
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/jugadores`);
    req.flush('Datos invalidos', { status: 400, statusText: 'Bad Request' });
  });
});
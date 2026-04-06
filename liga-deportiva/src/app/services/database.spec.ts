// database.spec.ts
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Database } from './database';
import { Jugador } from '../models/jugador.model';

describe('Database Service (modulo Jugadores)', () => {
  let service: Database;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:8000/api';

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
      }
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
      }
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

  it('deberia obtener todos los jugadores', (done) => {
    service.getJugadores().subscribe({
      next: (jugadores) => {
        expect(jugadores.length).toBe(2);
        expect(jugadores[0].nombre).toBe('Lionel Messi');
        expect(jugadores[1].deporte).toBe('Baloncesto');
        done();
      },
      error: () => done.fail('No deberia fallar')
    });

    const req = httpMock.expectOne(`${apiUrl}/jugadores`);
    expect(req.request.method).toBe('GET');
    // Devuelve la estructura ApiResponse que espera el servicio
    req.flush({ success: true, data: mockJugadores });
  });

  it('deberia crear un jugador', (done) => {
    const nuevoJugador: Partial<Jugador> = {
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

    service.createJugador(nuevoJugador as Jugador).subscribe({
      next: (response) => {
        expect(response).toBeTruthy();
        expect(response.id).toBe(3);
        expect(response.nombre).toBe('Kylian Mbappe');
        done();
      },
      error: () => done.fail('No deberia fallar')
    });

    const req = httpMock.expectOne(`${apiUrl}/jugadores`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body.nombre).toBe('Kylian Mbappe');
    // Devuelve la estructura ApiResponse que espera el servicio
    req.flush({ success: true, data: mockResponse });
  });

  it('deberia manejar errores en getJugadores', (done) => {
    service.getJugadores().subscribe({
      next: () => done.fail('Deberia haber fallado'),
      error: (error) => {
        expect(error.status).toBe(500);
        done();
      }
    });

    const req = httpMock.expectOne(`${apiUrl}/jugadores`);
    req.flush('Error del servidor', { status: 500, statusText: 'Server Error' });
  });

  it('deberia manejar errores en createJugador', (done) => {
    const nuevoJugador: Partial<Jugador> = {
      nombre: 'Test Player',
      equipoId: 1,
      deporte: 'Futbol',
      estadisticas: {}
    };

    service.createJugador(nuevoJugador as Jugador).subscribe({
      next: () => done.fail('Deberia haber fallado'),
      error: (error) => {
        expect(error.status).toBe(400);
        done();
      }
    });

    const req = httpMock.expectOne(`${apiUrl}/jugadores`);
    req.flush('Datos invalidos', { status: 400, statusText: 'Bad Request' });
  });
});
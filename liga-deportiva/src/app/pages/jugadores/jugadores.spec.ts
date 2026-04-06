import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Jugadores } from './jugadores';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Database } from '../../services/database';

describe('Jugadores (página real del módulo)', () => {
  let component: Jugadores;
  let fixture: ComponentFixture<Jugadores>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        Jugadores   // ← standalone: va en imports, NO en declarations
      ],
      providers: [Database]
    })
    // Solución para templateUrl + styleUrl en Angular 21 + Vitest
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

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call cargarJugadores() on ngOnInit and load data with mock HTTP', () => {
    const mockJugadores = [
      {
        id: 1,
        nombre: 'Test Jugador',
        posicion: 'Delantero',
        numero: 9,
        equipoId: 1,
        deporte: 'Fútbol'
      }
    ];

    component.ngOnInit();

    const reqEquipos = httpMock.expectOne(req =>
      req.url.includes('/equipos') && req.method === 'GET'
    );
    reqEquipos.flush({ success: true, data: [] });

    const reqJugadores = httpMock.expectOne(req =>
      req.url.includes('/jugadores') && req.method === 'GET'
    );
    expect(reqJugadores.request.headers.get('Content-Type')).toBe('application/json');
    reqJugadores.flush({ success: true, data: mockJugadores });

    expect(component.cargando).toBe(false);
    expect(component.jugadores.length).toBe(1);
    expect(component.jugadores[0].nombre).toBe('Test Jugador');
    expect(component.error).toBe('');
  });

  it('should handle error when loading jugadores', () => {
    component.ngOnInit();

    const reqEquipos = httpMock.expectOne(req => req.url.includes('/equipos'));
    reqEquipos.flush({ success: true, data: [] });

    const reqJugadores = httpMock.expectOne(req => req.url.includes('/jugadores'));
    reqJugadores.error(new ErrorEvent('Network error'));

    expect(component.cargando).toBe(false);
    expect(component.error).toContain('Error al cargar jugadores');
  });

  afterEach(() => {
    httpMock?.verify();   // ← protección contra undefined
  });
});
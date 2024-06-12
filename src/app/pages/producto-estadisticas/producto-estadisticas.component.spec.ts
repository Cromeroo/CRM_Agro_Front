import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoEstadisticasComponent } from './producto-estadisticas.component';

describe('ProductoEstadisticasComponent', () => {
  let component: ProductoEstadisticasComponent;
  let fixture: ComponentFixture<ProductoEstadisticasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductoEstadisticasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductoEstadisticasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

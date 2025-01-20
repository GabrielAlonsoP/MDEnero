import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PDestacadoComponent } from './p-destacado.component';

describe('PDestacadoComponent', () => {
  let component: PDestacadoComponent;
  let fixture: ComponentFixture<PDestacadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PDestacadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PDestacadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

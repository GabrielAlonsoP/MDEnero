import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParteFuerzaComponent } from './parte-fuerza.component';

describe('ParteFuerzaComponent', () => {
  let component: ParteFuerzaComponent;
  let fixture: ComponentFixture<ParteFuerzaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParteFuerzaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParteFuerzaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

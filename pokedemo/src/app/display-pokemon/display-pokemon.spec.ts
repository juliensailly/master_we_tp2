import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayPokemon } from './display-pokemon';

describe('DisplayPokemon', () => {
  let component: DisplayPokemon;
  let fixture: ComponentFixture<DisplayPokemon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DisplayPokemon]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayPokemon);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

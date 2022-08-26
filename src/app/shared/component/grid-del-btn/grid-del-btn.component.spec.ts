import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridDelBtnComponent } from './grid-del-btn.component';

describe('GridDelBtnComponent', () => {
  let component: GridDelBtnComponent;
  let fixture: ComponentFixture<GridDelBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridDelBtnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridDelBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridEditBtnComponent } from './grid-edit-btn.component';

describe('GridEditBtnComponent', () => {
  let component: GridEditBtnComponent;
  let fixture: ComponentFixture<GridEditBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridEditBtnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridEditBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

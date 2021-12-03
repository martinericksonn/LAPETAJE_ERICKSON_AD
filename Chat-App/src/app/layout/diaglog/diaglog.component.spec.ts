import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiaglogComponent } from './diaglog.component';

describe('DiaglogComponent', () => {
  let component: DiaglogComponent;
  let fixture: ComponentFixture<DiaglogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiaglogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiaglogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

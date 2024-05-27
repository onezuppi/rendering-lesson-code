import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Inner3Component } from './inner3.component';

describe('Inner3Component', () => {
  let component: Inner3Component;
  let fixture: ComponentFixture<Inner3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Inner3Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Inner3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

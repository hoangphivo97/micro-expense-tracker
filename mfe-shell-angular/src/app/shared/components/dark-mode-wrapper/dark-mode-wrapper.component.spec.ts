import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DarkModeWrapperComponent } from './dark-mode-wrapper.component';

describe('DarkModeWrapperComponent', () => {
  let component: DarkModeWrapperComponent;
  let fixture: ComponentFixture<DarkModeWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DarkModeWrapperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DarkModeWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

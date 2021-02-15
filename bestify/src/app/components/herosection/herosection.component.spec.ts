import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HerosectionComponent } from './herosection.component';

describe('HerosectionComponent', () => {
  let component: HerosectionComponent;
  let fixture: ComponentFixture<HerosectionComponent>;
  let VanillaTilt: any;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HerosectionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HerosectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    VanillaTilt = '';
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});

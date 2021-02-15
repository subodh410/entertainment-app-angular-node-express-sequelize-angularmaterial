import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';

import { QuizsectionComponent } from './quizsection.component';

describe('QuizsectionComponent', () => {
  let component: QuizsectionComponent;
  let fixture: ComponentFixture<QuizsectionComponent>;
  let jarallax: any;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, MatDialogModule],
      providers: [
        {
          provide: MatDialogRef,
          useValue: [],
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: [],
        },
      ],
      declarations: [QuizsectionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizsectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    jarallax="";
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});

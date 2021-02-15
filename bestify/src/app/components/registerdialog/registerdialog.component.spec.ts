import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { RegisterdialogComponent } from './registerdialog.component';

describe('RegisterdialogComponent', () => {
  let component: RegisterdialogComponent;
  let fixture: ComponentFixture<RegisterdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ 
      
        FormsModule,
        ReactiveFormsModule,MatDialogModule,HttpClientTestingModule
    ],
   
    providers: [
      { 
      provide: MatDialogRef,
      useValue: []
       }, 
      { 
      provide: MAT_DIALOG_DATA, 
      useValue: [] 
      }
      ],
      declarations: [ RegisterdialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

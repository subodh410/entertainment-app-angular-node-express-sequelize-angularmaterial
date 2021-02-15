import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { AdminComponent } from './admin.component';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      declarations: [AdminComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be defined at start', () => {
    expect(component.isMCQ).toBeDefined();
    expect(component.QueTab).toBeDefined();

    expect(component.displayedColumns).toBeDefined();
    expect(component.pie).toBeDefined();
    // expect(component.piedata).toBeDefined();
    expect(component.pietitle).toBeDefined();
    expect(component.piecolumns).toBeDefined();
    expect(component.pieoptions).toBeDefined();
    expect(component.piewidth).toBeDefined();
    expect(component.pieheight).toBeDefined();
    expect(component.column).toBeDefined();
    // expect(component.columndata).toBeDefined();
    expect(component.columntitle).toBeDefined();
    expect(component.columncolumns).toBeDefined();
    expect(component.columnheight).toBeDefined();
    expect(component.columnwidth).toBeDefined();
    expect(component.columnoptions).toBeDefined();
  });

 
});

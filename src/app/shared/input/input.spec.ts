import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

import { Input } from './input';

describe('Input', () => {
  let component: Input;
  let fixture: ComponentFixture<Input>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Input]
    })
      .compileComponents();

    fixture = TestBed.createComponent(Input);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, Input],
  template: `<app-input label="Nome" [formControl]="control"></app-input>`,
})
class InputHostComponent {
  control = new FormControl('', { nonNullable: true, validators: [Validators.required] });
}

describe('Input control errors', () => {
  let fixture: ComponentFixture<InputHostComponent>;
  let host: InputHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InputHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('shows validation error from NgControl automatically', () => {
    host.control.markAsTouched();
    host.control.updateValueAndValidity();
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Este campo e obrigatorio.');
  });
});

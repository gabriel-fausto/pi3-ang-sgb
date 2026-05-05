import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

import { Select } from './select';

describe('Select', () => {
  let component: Select;
  let fixture: ComponentFixture<Select>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Select]
    })
      .compileComponents();

    fixture = TestBed.createComponent(Select);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, Select],
  template: `<app-select label="Categoria" [options]="options" [formControl]="control"></app-select>`,
})
class SelectHostComponent {
  options = [
    { value: '', label: 'Selecione' },
    { value: 'a', label: 'Opcao A' },
  ];
  control = new FormControl('', { nonNullable: true, validators: [Validators.required] });
}

describe('Select control errors', () => {
  let fixture: ComponentFixture<SelectHostComponent>;
  let host: SelectHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('shows validation error from NgControl automatically', () => {
    host.control.markAsTouched();
    host.control.updateValueAndValidity();
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Selecione uma opcao.');
  });
});

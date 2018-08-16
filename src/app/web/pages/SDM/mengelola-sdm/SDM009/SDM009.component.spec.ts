/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SDM009Component } from './SDM009.component';

describe('SDM009Component', () => {
  let component: SDM009Component;
  let fixture: ComponentFixture<SDM009Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SDM009Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SDM009Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

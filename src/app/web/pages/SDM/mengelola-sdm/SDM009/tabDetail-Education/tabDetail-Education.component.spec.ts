/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TabDetailEducationComponent } from './tabDetail-Education.component';

describe('TabDetailEducationComponent', () => {
  let component: TabDetailEducationComponent;
  let fixture: ComponentFixture<TabDetailEducationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabDetailEducationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabDetailEducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

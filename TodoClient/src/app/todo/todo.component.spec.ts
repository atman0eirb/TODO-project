import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TODOComponent } from './todo.component';

describe('TODOComponent', () => {
  let component: TODOComponent;
  let fixture: ComponentFixture<TODOComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TODOComponent]
    });
    fixture = TestBed.createComponent(TODOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

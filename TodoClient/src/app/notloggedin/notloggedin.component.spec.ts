import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotloggedinComponent } from './notloggedin.component';

describe('NotloggedinComponent', () => {
  let component: NotloggedinComponent;
  let fixture: ComponentFixture<NotloggedinComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotloggedinComponent]
    });
    fixture = TestBed.createComponent(NotloggedinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoDateComponent } from './todo-date.component';

describe('TodoDateComponent', () => {
  let component: TodoDateComponent;
  let fixture: ComponentFixture<TodoDateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TodoDateComponent]
    });
    fixture = TestBed.createComponent(TodoDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatApplicationComponent } from './chat-application.component';

describe('ChatApplicationComponent', () => {
  let component: ChatApplicationComponent;
  let fixture: ComponentFixture<ChatApplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatApplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

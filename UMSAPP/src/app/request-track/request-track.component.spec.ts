import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestTrackComponent } from './request-track.component';

describe('RequestTrackComponent', () => {
  let component: RequestTrackComponent;
  let fixture: ComponentFixture<RequestTrackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestTrackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

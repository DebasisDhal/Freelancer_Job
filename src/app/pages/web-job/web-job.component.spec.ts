import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebJobComponent } from './web-job.component';

describe('WebJobComponent', () => {
  let component: WebJobComponent;
  let fixture: ComponentFixture<WebJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebJobComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

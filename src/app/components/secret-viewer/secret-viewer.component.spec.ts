import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecretViewerComponent } from './secret-viewer.component';

describe('SecretViewerComponent', () => {
  let component: SecretViewerComponent;
  let fixture: ComponentFixture<SecretViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecretViewerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecretViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

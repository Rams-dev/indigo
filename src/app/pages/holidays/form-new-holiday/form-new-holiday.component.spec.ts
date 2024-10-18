import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormNewHolidayComponent } from './form-new-holiday.component';

describe('FormNewHolidayComponent', () => {
  let component: FormNewHolidayComponent;
  let fixture: ComponentFixture<FormNewHolidayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormNewHolidayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormNewHolidayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

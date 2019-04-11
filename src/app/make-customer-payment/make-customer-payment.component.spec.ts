import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeCustomerPaymentComponent } from './make-customer-payment.component';

describe('MakeCustomerPaymentComponent', () => {
  let component: MakeCustomerPaymentComponent;
  let fixture: ComponentFixture<MakeCustomerPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakeCustomerPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeCustomerPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

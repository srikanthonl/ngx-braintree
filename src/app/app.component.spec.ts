import {async, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {NgxBraintreeModule} from 'ngx-braintree';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Type} from '@angular/core';

describe('AppComponent', () => {
  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        HttpClientModule,
        NgxBraintreeModule,
        HttpClientTestingModule
      ],
      declarations: [
        AppComponent
      ]
    }).compileComponents();

    httpTestingController = TestBed.get(HttpTestingController as Type<HttpTestingController>);

    spyOn(console, 'error');
  }));

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`chargeAmount should be '55.55'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.chargeAmount).toEqual(55.55);
  }));
  it('should reflect to failed getclienttoken call', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const req = httpTestingController.expectOne('api/braintree/getclienttoken');
    expect(req.request.method).toBe('GET');
    req.flush({}, {status: 404, statusText: 'Not found'});
    fixture.detectChanges();
    expect(console.error).toHaveBeenCalled();
  }));
});

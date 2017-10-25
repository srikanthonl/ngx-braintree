import { BraintreeAngularPage } from './app.po';

describe('braintree-angular App', () => {
  let page: BraintreeAngularPage;

  beforeEach(() => {
    page = new BraintreeAngularPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});

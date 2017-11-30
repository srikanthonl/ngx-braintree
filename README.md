<h1>Integrating Braintree in Angular applications</h1>

This module integrates the Braintree Dropin UI integration with your Angular application. The integration aims at componentizing the Braintree-Angular integration so that you can just use the component `<ngx-braintree></ngx-braintree>` anywhere in your application and expect the integration to work. 

## Usage

> Note: Although this package works without any issues, the project is currently in a pre-release version and the final/stable version will be released very soon.

First, install `ngx-braintree` by issuing the following command:

> npm install ngx-braintree --save

After the above step is done, import it into your module:

> import { BraintreeModule } from 'ngx-braintree';

`ngx-braintree` uses `HttpClientModule`, so import that as well:

> import { HttpClientModule } from '@angular/common/http';

Now in the imports section of @NgModule add these two lines `BraintreeModule.forRoot()` and `HttpClientModule` as shown below:

>  imports: [ BraintreeModule.forRoot(), HttpClientModule ]

Now that you have finished all the above steps, you are now ready to use the ngx-braintree component in your application. Where ever you want the Braintree Dropin UI in your application, you can use the `<ngx-braintree></ngx-braintree>`component as shown below:

	<ngx-braintree 
		[clientTokenURL]="'api/braintree/getclienttoken'" 
		[createPurchaseURL]="'api/braintree/createpurchase'" 
		(paymentStatus)="redirect($event)">
	</ngx-braintree>
	
**clientTokenURL** – is **YOUR** server-side API URL. 
This is YOUR server-side API method which calls Braintree and gets the clientToken for the Drop-in UI. 

**createPurchaseURL** – is **YOUR** server-side API URL. 
This is YOUR server-side API method which is called when the user clicks Pay. This method communicates with Braintree to create a purchase.  

**paymentStatus** - is the event that you should listen to. This event is emitted when a payment process finishes. The event emits the response that your purchase URL API method (createPurchaseURL's value) returns. Returning the same response, helps you in accessing the response object on the client side and also helps you make decisions whether to redirect user to the payment confirmation page (if the payment succeeded) or to do something else if anything went wrong.

> Make sure the values of **clientTokenURL** and **createPurchaseURL** are enclosed in single quotes

<h1>Optional configuration for `ngx-braintree` component</h1>

The `ngx-braintree` component can be optionally configured by providing the text of the pay button. The default text on the button is Buy. If you want to have a custom text such as 'Pay' or 'Pay Now' instead of 'Buy', you can configure it. Pass the text you desire as the value of the input property as shown below:

	<ngx-braintree 
		[clientTokenURL]="'api/braintree/getclienttoken'" 
		[createPurchaseURL]="'api/braintree/createpurchase'" 
		(paymentStatus)="onPaymentStatus($event)"
		[buttonText]="'Pay'">
	</ngx-braintree>

> Make sure the value of **buttonText** is enclosed in single quotes

<h1>Braintree Server API</h1>

Along with the client side work (which `ngx-braintree` component fully takes care of), Braintree also requires us to write two server side API methods. To successfully use the `ngx-braintree` component, a simple API with two methods is required. One method's URL is the value for the **clientTokenURL** and other method's URL is the value for the **createPurchaseURL** properties of the `ngx-braintree` component. These API methods can be developed very easily on any server platform by visiting the following link https://developers.braintreepayments.com/start/hello-server/dotnet

<h1>Issues</h1>

Please report any issues/feature requests here: https://github.com/srikanthonl/ngx-braintree/issues

<h1>Change Log</h1>
<h3>v0.2.0</h3>
<ul>
<li>The Buy button text is now configurable. You can pass the text you desire using the buttonText input property of the ngx-braintree component.</li>
<li>Applied styles for the Buy button.</li>
<li>Updated Readme.</li>
</ul>

<h3>v0.1.16</h3>
<ul>
<li>paymentStatus event is now changed to return whatever the API method of createPurchaseURL returns.</li>
<li>removed the unnecessary Braintree Component heading.</li>
</ul>

<h3>v0.1.15</h3>
<ul>
<li>The package is now stable.</li>
<li>Updated Readme.</li>
</ul>
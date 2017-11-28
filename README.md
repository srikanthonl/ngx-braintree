<h1>Integrating Braintree in Angular applications</h1>

This module facilitates the Dropin UI integration of Braintree. The integration aims at componentizing the Braintree-Angular integration so that you can just use the component `<ngx-braintree></ngx-braintree>` anywhere in your application and expect the integration to work. 

## Usage

> Note: Although this package works without any issues, the project is currently in a pre-release version and the final/stable version will be released very soon.

First, install `ngx-braintree` by issuing the following command:

> npm install ngx-braintree --save

After the above step is done, import it into your module:

> import { BraintreeModule } from 'ngx-braintree';

`ngx-braintree` uses `HttpClientModule`, so import that as well:

> import { HttpClientModule } from '@angular/common/http';

Don't forget to include `BraintreeModule.forRoot()` and `HttpClientModule` in the imports section of @NgModule as shown below:

>  imports: [ BrowserModule, BraintreeModule.forRoot(), HttpClientModule ]

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

**paymentStatus** - is the event that you should listen to. This event is raised when a successful payment is done. It is here where you can call a method to redirect to a payment confirmation page.

<h1>Braintree Server API</h1>

Along with the client side work (which `ngx-braintree` component fully takes care of), Braintree also requires us to write two server side API methods. To successfully use the `ngx-braintree` component, a simple API with two methods is required. One method's URL is the value for the **clientTokenURL** and other method's URL is the value for the **createPurchaseURL** properties of the `ngx-braintree` component. These API methods can be developed very easily on any server platform by visiting the following link https://developers.braintreepayments.com/start/hello-server/dotnet

<h1>Issues</h1>

Please report any issues/feature requests here: https://github.com/srikanthonl/ngx-braintree/issues

<h1>Change Log</h1>

<h3>v0.1.15</h3>
<ul>
<li>The package is now stable.</li>
<li>Updated Readme.</li>
</ul>
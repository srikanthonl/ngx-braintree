<h1>Integrating Braintree in Angular applications</h1>

This module integrates the Braintree Dropin UI integration (v3) with your Angular 4.x and 5.x applications. The integration aims at componentizing the Braintree-Angular integration so that you can just use the component `<ngx-braintree></ngx-braintree>` anywhere in your application and you are good to go. 

![Demo](https://srikanth.onl/wp-content/uploads/2018/03/2018-03-25-19_23_27.gif)

## Usage

> Note: This is not an official Braintree Angular component.

First, if your application is in Angular 5.x, install ngx-braintree by issuing the following command:

> npm install ngx-braintree --save

If your application is an Angular 4.x application, install ngx-braintree by issuing the following command:

> npm install ngx-braintree@a4

After the above step is done, import it into your module:

> import { NgxBraintreeModule } from 'ngx-braintree';

ngx-braintree uses HttpClientModule, so import that as well (if you haven't already):

> import { HttpClientModule } from '@angular/common/http';

Now in the imports section of @NgModule add these two lines NgxBraintreeModule and HttpClientModule as shown below:

>  imports: [ NgxBraintreeModule, HttpClientModule ]

Now that you have finished all of the above steps, you are now ready to use the **ngx-braintree** component in your application. **Before you start using it, it is worth mentioning that, ngx-braintree maintains consistency by sending and receiving data to and from your API in JSON format. So it's important for your API to conform to how to send data to and receive data from ngx-braintree**

OK, so lets use ngx-braintree. Where ever you want the Braintree Dropin UI in your application, you can use the `<ngx-braintree></ngx-braintree>`component as shown below:
```html
<ngx-braintree 
  [clientTokenURL]="'api/braintree/getclienttoken'" 
  [createPurchaseURL]="'api/braintree/createpurchase'" 
  [chargeAmount]="55.55"
  (paymentStatus)="onPaymentStatus($event)">
</ngx-braintree>
```
**clientTokenURL** – is **YOUR** server-side API GET URL. `ngx-braintree` expects the response from this URL in the following JSON format

```json
	{ "token":"braintree_client_token_generated_on_your_server" }
```
**It is important that your API method generates and sends the token in the above mentioned JSON format for ngx-braintree to render the drop-in UI successfully.** This is your server-side API GET method which calls Braintree and gets the clientToken for the Drop-in UI. **ngx-braintree** starts displaying the UI as soon as it receives the clientToken that your server provides.

 A sample server API method that generates the clientToken **in the above said JSON format**, is as shown below (.NET Code). 

```csharp
        public class ClientToken
        {
            public string token { get; set; }

            public ClientToken(string token)
            {
                this.token = token;
            }
        }

        [Route("api/braintree/getclienttoken")]
        public HttpResponseMessage GetClientToken()
        {
            var gateway = new BraintreeGateway
            {
                Environment = Braintree.Environment.SANDBOX,
                MerchantId = "your_braintree_merchant_id",
                PublicKey = "your_braintree_public_key",
                PrivateKey = "your_braintree_private_key"
            };

            var clientToken = gateway.ClientToken.Generate();
            ClientToken ct = new ClientToken(clientToken);
            return Request.CreateResponse(HttpStatusCode.OK, ct, Configuration.Formatters.JsonFormatter);
        }
```
**createPurchaseURL** – is **YOUR** server-side API POST URL.
This is YOUR server-side API POST method which is called when the user clicks Pay. **ngx-braintree** will post the payment method nonce to the URL you provide through which you process the payment from your server and return the response. **ngx-braintree** posts the nonce and the chargeAmount, to the URL you provide, in the following format:

	{"nonce":"d7438dd5-7f14-0b2a-7a6f-f3c83d43b5b7","chargeAmount":55.55}
	
**It is important for your POST API method to be able to receive and read the above response to successfully handle the purchase.**

A sample server API POST method is as shown below (.NET Code). 
```csharp
    	public class Nonce
    	{
        	public string nonce { get; set; }
        	public decimal chargeAmount { get; set; }
			
        	public Nonce(string nonce)
        	{
            	this.nonce = nonce;
            	this.chargeAmount = chargeAmount;
        	}
    	}

        [Route("api/braintree/createpurchase")]
        public HttpResponseMessage Post([FromBody]Nonce nonce)
        {
            var gateway = new BraintreeGateway
            {
                Environment = Braintree.Environment.SANDBOX,
                MerchantId = "your_braintree_merchant_id",
                PublicKey = "your_braintree_public_key",
                PrivateKey = "your_braintree_private_key"
            };

            var request = new TransactionRequest
            {
                Amount = nonce.chargeAmount,
                PaymentMethodNonce = nonce.nonce,
                Options = new TransactionOptionsRequest
                {
                    SubmitForSettlement = true
                }
            };

            Result<Transaction> result = gateway.Transaction.Sale(request);
            HttpResponseMessage response = Request.CreateResponse(result);
            return response;
        }
```
**chargeAmount** - is the amount to charge.

**paymentStatus** - is the event that you should listen to. The `paymentStatus` event is emitted when a payment process finishes. The event emits the response that your purchase URL API method (createPurchaseURL) returns. **And your purchase url API method must return the same response that you have received from Braintree. This is because it makes some decisions based on the Braintree response. For ex: Automatically re-rendering the Dropin UI and also showing what went wrong, if your transaction is a failure.** Returning the same response, helps you in accessing the response object on the client side and also helps you make decisions whether to redirect user to the payment confirmation page (if the payment succeeded) or to do something else if anything went wrong.

> Make sure the values of **clientTokenURL** and **createPurchaseURL** are enclosed in single quotes

<h1>Optional configurations for `ngx-braintree` component</h1>

The `ngx-braintree` component can be optionally configured by providing the following inputs to the component.

1. **[buttonText]**: This allows you to configure the text of the pay button. The default text on the button is Buy. If you want to have a custom text such as 'Pay' or 'Pay Now', you can configure it. Pass the text you desire as the value of the input property as shown below:
    ```html
    <ngx-braintree 
      [clientTokenURL]="'api/braintree/getclienttoken'" 
      [createPurchaseURL]="'api/braintree/createpurchase'" 
      [chargeAmount]="55.55"
      (paymentStatus)="onPaymentStatus($event)"
      [buttonText]="'Pay'">
    </ngx-braintree>
	```
	> Make sure the value of **buttonText** is enclosed in single quotes.
2. **[allowChoose]**: This provides you the ability to configure whether to let the user choose another way to pay after he has entered the payment details. Pass true or false as the value of the input property as shown below. The default will be false, if you don't specify this configuration.
    ```html
    <ngx-braintree 
      [clientTokenURL]="'api/braintree/getclienttoken'" 
      [createPurchaseURL]="'api/braintree/createpurchase'"
      (paymentStatus)="onPaymentStatus($event)"
      [chargeAmount]="55.55"
      ...
      [allowChoose]="true">
    </ngx-braintree>
    ```
	This is a two step process that Braintree supports. You can configure ngx-braintree to make it work in the following way:

	1. If **[allowChoose]** is set to true, as soon as the user enters payment details and clicks Pay, user will be shown another UI where he can opt to change his payment details by choosing another payment method or just click Pay again as shown below: <br />![Two step process](https://srikanth.onl/wp-content/uploads/2017/12/twostep.gif)	
	2. If **[allowChoose]** is set to false, it will only be a one step process and the user is not given any option to change his payment details and the payment process will continue as soon as he clicks Pay as shown below. This is the default setting of **ngx-braintree** component. <br />![One step process](https://srikanth.onl/wp-content/uploads/2017/12/onestep.gif)
	
3. **[showCardholderName]**: allows you to configure whether or not to show the cardholder name field in the Dropin UI. The default value for this is false. If you want cardholder name to be shown, pass [showCardholderName]="true" to the ngx-braintree component.
	```html
    <ngx-braintree 
      [clientTokenURL]="'api/braintree/getclienttoken'" 
      [createPurchaseURL]="'api/braintree/createpurchase'"
      (paymentStatus)="onPaymentStatus($event)"
      [chargeAmount]="55.55"
      ...
      [showCardholderName]="true"
      >
    </ngx-braintree>
    ```
4. **[enablePaypalCheckout]**: enables the Paypal checkout functionality.
    ```html
    <ngx-braintree 
      [clientTokenURL]="'api/braintree/getclienttoken'" 
      [createPurchaseURL]="'api/braintree/createpurchase'"
      (paymentStatus)="onPaymentStatus($event)"
      [chargeAmount]="55.55"
      ...
      [enablePaypalCheckout] = "true">
    </ngx-braintree>
    ```
5. **[currency]**: **currency is mandatory when enablePaypalCheckout is set to true.**
    ```html
    <ngx-braintree 
      [clientTokenURL]="'api/braintree/getclienttoken'" 
      [createPurchaseURL]="'api/braintree/createpurchase'"
      (paymentStatus)="onPaymentStatus($event)"
      [chargeAmount]="55.55"
      ...
      [enablePaypalCheckout] = "true"
      [currency]="'USD'">
    </ngx-braintree>
    ```
6. **[enablePaypalVault]**: enables the Paypal vault functionality.
    ```html
    <ngx-braintree 
      [clientTokenURL]="'api/braintree/getclienttoken'" 
      [createPurchaseURL]="'api/braintree/createpurchase'"
      (paymentStatus)="onPaymentStatus($event)"
      [chargeAmount]="55.55"
      ...
      [enablePaypalVault] = "true">
    </ngx-braintree>
    ```
		
7. **[locale]**: locale support
    ```html
      <ngx-braintree 
      	[clientTokenURL]="'api/braintree/getclienttoken'" 
      	[createPurchaseURL]="'api/braintree/createpurchase'"
      	(paymentStatus)="onPaymentStatus($event)"
      	[chargeAmount]="55.55"
      	...
        [locale]="'en_AU'">
      </ngx-braintree>
    ```
		
8. **[getClientToken]**: Pass a function in order to resolve the client token from the server.

    ```html
      <ngx-braintree 
        [getClientToken]="yourGetClientTokenFunction" 
        ...>
      </ngx-braintree>
    ```
    
	The function passed to the getClientToken property must return an Observable such as an HTTP Request or a custom Observable.
    
    ```ts
    export class MyComponent {
      ...

      getClientTokenFunction(): Observable<string> {
        return Observable.of('-test-key-here-');
      }

      // OR

      getClientTokenFunction(): Observable<string> {
        return this.http.get('path/to/endpoint', {
          headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'my-auth-token'
        }).map((res: any) => {
          return res.token.located.here; // This should return a string
        });
      }
    }
    ```
    
   **Examples (ES 5 and ES 2015)**
   
   	**ES 5**
    ```html
    <ngx-braintree 
    	[getClientToken] = "getClientToken.bind(this)" // if your getClientToken function is an ES 5 function. 
        // If your function that you are passing is an ES 2015 function (fat arrow function) 
        // then binding is not required.
    	...>
	</ngx-braintree>
    
    and an example of ES 5 function that is being passed in the code above:
    
      getClientToken(): Observable<string> {
    	return this.http
      	.get('api/braintree/getclienttoken', { responseType: 'json' })
      	.map((response: any) => {
	        return response.token;
	      })
	    .catch((error) => {
        	return Observable.throw(error);
      	});
  	  }
      ```
    **ES 2015**
    ```html
    <ngx-braintree 
    	[getClientToken] = "getClientToken" 
        ...>
	</ngx-braintree>
    
    and an example of ES 2015 function that is being passed in the code above:
    
      getClientToken = () => {
    	return this.http
      	.get('api/braintree/getclienttoken', { responseType: 'json' })
      	.map((response: any) => {
        	return response.token;
      		})
      	.catch((error) => {
        	return Observable.throw(error);
      	});
  	  }
    ```

9. **[createPurchase]**: Pass a function in to handle payment creation from a nonce

      ```html
        <ngx-braintree 
          [createPurchase]="createPurchaseFunction" 
          ...>
        </ngx-braintree>
      ```

	The function passed to the getClientToken property must return an Observable such as an HTTP Request or a custom Observable.

    ```ts
    export class MyComponent {
      ...

      createPurchaseFunction(): Observable<string> {
        return this.http.get('path/to/endpoint', {
          headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'my-auth-token'
        });
      }
    }
    ```
    
    **Examples (ES 5 and ES 2015)**
   
   	**ES 5**
    ```html
    <ngx-braintree 
    	[createPurchase] = "createPurchase.bind(this)"
    	...>
	</ngx-braintree>
    
    and an example of ES 5 function that is being passed in the code above:
    
      createPurchase(nonce: string, chargeAmount: number): Observable<any> {
    	const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    	return this.http
    	  .post('api/braintree/createpurchase', { nonce: nonce, chargeAmount: chargeAmount }, { 'headers': headers })
      	  .map((response: any) => {
       	    return response;
      	 });
  		}
      ```
    **ES 2015**
    ```html
    <ngx-braintree 
    	[createPurchase] = "createPurchase" 
        ...>
	</ngx-braintree>
    
    and an example of ES 2015 function that is being passed in the code above:
    
  	createPurchase = (nonce: string, chargeAmount: number) => {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
      .post('api/braintree/createpurchase', { nonce: nonce, chargeAmount: chargeAmount }, { 'headers': headers })
      .map((response: any) => {
        return response;
      });
    }
    ```
10. **enabledStyle** and **disabledStyle**: Make the Purchase button's styles (when enabled and when disabled) consistent with your application's styles. Pass in enabled and disabled style objects as shown below:

		```html
		<ngx-braintree>
    		...
    		[enabledStyle]="enabledStyle"
    		[disabledStyle]="disabledStyle"
    	</ngx-braintree>
        
		and these are the examples of objects that are being sent in the above example.
    
        enabledStyle = {
          'background-color': '#000000',
          'color': '#ffffff',
          'border': 'none',
          'border-radius': '4px',
          'height': '40px',
          'line-height': '40px',
          'font-size': '16px',
          'cursor': 'pointer'
   		 };

        disabledStyle = {
          'background-color': 'lightgray',
          'color': '#ffffff',
          'border': 'none',
          'border-radius': '4px',
          'height': '40px',
          'line-height': '40px',
          'font-size': '16px',
          'cursor': 'not-allowed'
        };
   11. **Loader GIF**: ngx-braintree comes with a built-in loader gif animation which gets displayed when it's waiting for the client token to be received and after clicking Purchase, while it waits for the purchase response. You can also content project your own loader gif in the following way:
   
   		```html
		<ngx-braintree
    		...>
            <img src="../assets/images/your_loader_image.gif">
    	</ngx-braintree>
        
   12. You can do the following if you want to add your own buttons adjacent to the Purchase button, with your own styles (for ex: adding a back button, clicking upon which you will call your own method that navigates him back to the previous screen, or adding a Summary button which calls your own method that shows the user the Summary before he proceeds for the payment). This feature facilitates you in projecting your own content (ex: buttons) into ngx-braintree which are consistent and aligned as you'll be adding styles into the content that you are projecting. The below example projects a div with styles information and most importantly projects two buttons, Back button (which calls your own method) and **Purchase button (with ngxPay directive applied to it).** **Note: The Purchase button is not automatically rendered if you are using this feature. You have to add your own buttons and also add a button exclusively for Purchase and apply the ngxPay directive to it. That becomes your Purchase button. The Purchase button display text is ignored and replaced by the value of the buttonText input property.**

		```html
		<ngx-braintree
    		...>
            <div>
        	<style>
              button {
                  background-color: red;
                  color: #ffffff;
                  border: none;
                  border-radius: 4px;
                  height: 40px;
                  line-height: 40px;
                  font-size: 16px;
                  cursor: pointer;
              }
        
              button:disabled {
                  background-color: rgb(236, 154, 154);
                  color: #ffffff;
                  border: none;
                  border-radius: 4px;
                  height: 40px;
                  line-height: 40px;
                  font-size: 16px;
                  cursor: not-allowed;
              }
        	</style>
        	<div><button (click)="navigateToPreviousPage()">Back</button> <button ngxPay>Purchase</button></div>
    		</div>
    	</ngx-braintree>
<h1>Braintree Server API</h1>

As mentioned above, along with the client side work (which `ngx-braintree` component fully takes care of), Braintree also requires us to write two server side API methods. To successfully use the **ngx-braintree** component, a simple API with two methods is required (.NET code for those two methods is shown above). One method's URL is the value for the **clientTokenURL** and other method's URL is the value for the **createPurchaseURL** properties of the `ngx-braintree` component. These API methods can be developed very easily on any server platform by visiting the following link https://developers.braintreepayments.com/start/hello-server/dotnet

Note: Just make sure you are sending data to ngx-braintree and receiving data from ngx-braintree in the format discussed earlier in the Usage section.

<h1>Issues</h1>

Please report any issues/feature requests here: https://github.com/srikanthonl/ngx-braintree/issues

<h1>More Information</h1>

For more information please visit

https://srikanth.onl/integrating-braintree-with-angular-applications/

<h1>Change Log</h1>
<h3>Version 1.9.0</h3>
<ul>
<li>ngx-braintree now supports projecting your own content with styles into it. </li>
<li>ngx-braintree now provides better user experience by showing progress indicators whenever required. </li>
<li>You can also project your own loader image to be consistent with your application.</li>
</ul>
<h3>Version 1.8.0</h3>
<ul>
<li>ngx-braintree now supports passing your own functions into it for getting a client token and handling purchases.</li>
</ul>
<h3>Version 1.7.1</h3>
<ul>
<li>Fixed an issue where Pay button was disabled even when Dropin was valid.</li>
</ul>
<h3>Version 1.7.0</h3>
<ul>
<li>Locale support.</li>
<li>Enables/Disables Pay button when the Dropin UI goes Valid/Invalid.</li>
<li>Fixed an issue where it was required to click the pay button twice when paying through PayPal checkout.</li>
<li>Other enhancements</li>
</ul>
<h3>Version 1.6.0</h3>
<ul>
<li>
ngx-braintree now supports Paypal Checkout and Paypal Vault. Check the optional configuration section of this document for more info.
</li>
</ul>

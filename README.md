<h1 align="center">Integrating Braintree in Angular applications</h1>

This integration demonstrates the Drop-in UI integration of Braintree. The integration aims at componentizing the Braintree-Angular integration so that you can just use the component `<app-braintree></app-braintree>` anywhere in your application and expect the integration to work.

## Braintree Server API

To successfully run this application, a simple API method which sends the clientToken to your Angular application for the Drop-in ui to render and another API method that allows you to make a purchase needs to be setup. This can be easily done on any platform by visiting the following link https://developers.braintreepayments.com/start/hello-server/dotnet

or the following sample code can be used if you are using a .NET Web API

1. First install Braintree into your .NET Web API application using the following command
Install-Package Braintree
2. The following two methods can be used that provide the clientToken to your Angular-Braintree application and a purchase method which gets called when the user clicks pay.

Note: You might need to allow CORS for specific domains in these API methods. As an example all domains are allowed in the following code.

    public class BraintreeController : ApiController
    {
		[EnableCors(origins: "*", headers: "*", methods: "*")]
        [Route("api/braintree/getclienttoken")]
        public HttpResponseMessage GetClientToken()
        {
            //Please feel free to use your own Braintree Sandbox details here.
            var gateway = new BraintreeGateway
            {
                Environment = Braintree.Environment.SANDBOX,
                MerchantId = "3vrktnc56t4kgkxn",
                PublicKey = "fh54mmy7zcxkwpws",
                PrivateKey = "1839951596265bd0f61bf6a8712f4419"
            };

            var clientToken = gateway.ClientToken.Generate();
            HttpResponseMessage response = Request.CreateResponse(clientToken);
            return response;
        }

        public class Nonce
        {
            public string nonce;

            public Nonce(string nonce)
            {
                this.nonce = nonce;
            }
        }

		[EnableCors(origins: "*", headers: "*", methods: "*")]
        [Route("api/braintree/createpurchase")]
        public HttpResponseMessage Post(Nonce nonce)
        {
            var gateway = new BraintreeGateway
            {
                Environment = Braintree.Environment.SANDBOX,
                MerchantId = "3vrktnc56t4kgkxn",
                PublicKey = "fh54mmy7zcxkwpws",
                PrivateKey = "1839951596265bd0f61bf6a8712f4419"
            };

            var request = new TransactionRequest
            {
                Amount = 10.00M,
                PaymentMethodNonce = nonce.nonce,
                Options = new TransactionOptionsRequest
                {
                    SubmitForSettlement = true
                }
            };

            Result<Transaction> result = gateway.Transaction.Sale(request);
            HttpResponseMessage response = Request.CreateResponse(result);
            return response;
            // Use payment method nonce here
        }

    }

    Note: Once this is done make sure you edit the proxy.config.json file's target value to the value that your Server API is running on.

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Further help

For more information visit https://srikanth.onl/integrating-braintree-with-angular-applications/
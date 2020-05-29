export interface IThreeDParameters {
    amount: string;
    email?: string;
    billingAddress?: IAddress;
    additionalInformation?: IAdditionalInformation;
}

export interface IAddress {
    givenName?: string;
    surname?: string;
    phoneNumber?: string;
    streetAddress?: string;
    extendedAddress?: string;
    locality?: string;
    region?: string;
    postalCode?: string;
    countryCodeAlpha2?: string;
}

export interface IAdditionalInformation {
    workPhoneNumber?: string;
    shippingGivenName?: string;
    shippingSurname?: string;
    shippingPhone?: string;
    shippingAddress?: IAddress;
}
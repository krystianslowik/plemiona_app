// repo required: typescript, react
import React from "react";
declare const window: {
  trustbadge: { reInitialize: () => void };
};

const TrustedBadge = (): JSX.Element => {
  //CHANGE: in customers end useMount is imported from react-use
  const useMount = (callback) => {
    React.useEffect(() => {
      callback();
    }, []);
  };

  //CHANGE: in customers end that obj is transferred as props from API component
  const booking = {
    bookingNumber: "123456",
    client: {
      communicationDetails: {
        email: "somemail_123@example.com",
      },
    },
    openAmount: {
      finalPrice: 100,
      currencyCode: "USD",
    },
    payments: [
      {
        paymentData: {
          option: "Credit Card",
        },
      },
    ],
    bookingDate: "2023-05-25",
  };
  useMount(() => {
    if (!!window?.trustbadge?.reInitialize) {
      window.trustbadge.reInitialize();
    }
  });

  return (
    <div id="trustedShopsCheckout" hidden>
      <span id="tsCheckoutOrderNr">{booking?.bookingNumber}</span>
      <span id="tsCheckoutBuyerEmail">
        {booking?.client?.communicationDetails?.email}
      </span>
      <span id="tsCheckoutOrderAmount">{booking?.openAmount?.finalPrice}</span>
      <span id="tsCheckoutOrderCurrency">
        {booking?.openAmount?.currencyCode}
      </span>
      <span id="tsCheckoutOrderPaymentType">
        {booking?.payments[0]?.paymentData?.option}
      </span>
      <span id="tsCheckoutOrderEstDeliveryDate">{booking?.bookingDate}</span>
    </div>
  );
};

export default TrustedBadge;

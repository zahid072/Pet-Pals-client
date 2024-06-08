import {
  CardElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { Button } from "@material-tailwind/react";
import { toast } from "react-toastify";

const CheckoutForm = ({
  setRefetch,
  campaign,
  totalAmount,
  setDonateModal,
  setSubmitLoader,
}) => {
  const [error, setError] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState("");
  const { user } = useAuth();
  const email = user?.email
    ? user?.email
    : user?.reloadUserInfo?.providerUserInfo[0].email;
  const totalPrice = totalAmount;
  useEffect(() => {
    axiosSecure
      .post("/create-payment-intent", { price: totalPrice })
      .then((res) => {
        // console.log(res.data);
        setClientSecret(res.data.clientSecret);
      });
  }, [axiosSecure, totalPrice]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoader(true)
    if (!stripe || !elements) {
      setSubmitLoader(false)
      return;
    }
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
      setSubmitLoader(false)
      // console.log("[error]", error);
    } else {
      setError("");
      console.log("[PaymentMethod]", paymentMethod);
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "anonymous",
            email: user?.email || "anonymous",
          },
        },
      });
    if (confirmError) {
      // Inform the customer that there was an error.
      setError(confirmError.message);
      setSubmitLoader(false)
      // console.log(confirmError.message);
    } else {
      // Handle next step based on PaymentIntent's status.
      // console.log("payment intent", paymentIntent);
      const amount = paymentIntent.amount / 100;
      if (paymentIntent.status === "succeeded") {
        const newPayment = {
          user: email,
          image: campaign?.image,
          petName:campaign?.petName,
          ownerEmail: campaign?.email,
          transactionId: paymentIntent.id,
          amount,
          campaignId: campaign?._id,
          timestamp: new Date().toISOString(),
        };

        axiosSecure.post("/donationCampaign/history", newPayment).then(res =>{
          if(res.data.insertedId){
            setDonateModal(false);
            setError("");
            setSubmitLoader(false)
            toast("Payment Success.", {
              position: "top-center",
              hideProgressBar: true,
              theme: "light",
            });
          }
        }).catch(err =>{
          setSubmitLoader(false)
        })

        
          axiosSecure
            .patch(`/donationCampaign/donate/${campaign?._id}`, {
              maxAmount: campaign?.maxAmount+amount,
            })
            .then((res) => {setRefetch()});
        
       
        setError("");
      }
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <div className="flex justify-center mt-5 items-center">
        <Button
          className="mt-5 "
          type="submit"
          disabled={!stripe || !clientSecret || totalAmount < 1}
        >
          Pay Now
        </Button>
      </div>
      {error && <p className="text-red-400">{error}</p>}
    </form>
  );
};

export default CheckoutForm;

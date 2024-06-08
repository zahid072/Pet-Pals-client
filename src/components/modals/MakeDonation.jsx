import { Elements } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import CheckoutForm from "../../pages/payment/CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { Button, Input } from "@material-tailwind/react";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PAYMENT_KEY);

const MakeDonation = ({setRefetch, campaign, setDonateModal }) => {
  const [submitLoader, setSubmitLoader] = useState(false);
  const [defaultValue, setDefaultValue] = useState("");
  const [Toggle, setToggle] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [err, setErr] = useState("");
  const amountLeft =campaign?.userCanDonate - campaign?.maxAmount

  const handleGetAmount = () => {
    setErr("");
    if (defaultValue > amountLeft) {
      setErr(`Sorry, you can't donate more than $${amountLeft}`);
      setTotalAmount(0);
    } else if (defaultValue <= 0) {
      setErr("Enter a valid amount.");
    } else {
      setTotalAmount(defaultValue);
      setToggle(true);
      setDefaultValue("");
    }
  };
  return (
    <div className="fixed top-[20%] left-1/2 -translate-x-1/2 bg-white rounded-md max-w-lg w-full min-h-56">
      <div className="relative p-5">
        {submitLoader && (
          <span className="loader absolute z-50 top-0 right-0 left-0 "></span>
        )}
        <button
          onClick={() => {
            setDonateModal(false);
          }}
          className="p-1 absolute top-2 right-2 bg-blue-gray-200 rounded"
        >
          <IoClose className="text-black text-xl" />
        </button>

        <div>
          <h1 className="text-center text-xl font-semibold text-black font-gilda">
            Payment method
          </h1>
          <div className="my-2 text-black text-center ">
            {Toggle && <p>Your Amount is: ${totalAmount}</p>}
          </div>
          <div className={Toggle ? "my-5 hidden" : "mt-5"}>
            {err && <p className="text-red-400 text-sm mb-2">{err}</p>}
            <Input
              onChange={(e) => {
                setDefaultValue(e.target.value);
              }}
              value={defaultValue}
              type="number"
              variant="standard"
              label={`Enter your amount max $${amountLeft}`}
              placeholder="Enter Your Amount"
            />
            <div className="flex justify-center w-full">
              <Button onClick={handleGetAmount} className="mt-4">
                Add To Pay
              </Button>
            </div>
          </div>
          <div className={Toggle ? "" : "hidden"}>
            <Elements stripe={stripePromise}>
              <CheckoutForm
              setRefetch={setRefetch}
                campaign={campaign}
                setDonateModal={setDonateModal}
                setSubmitLoader={setSubmitLoader}
                totalAmount={totalAmount}
              />
            </Elements>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MakeDonation;

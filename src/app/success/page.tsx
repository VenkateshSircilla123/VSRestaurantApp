"use client";
import ErrorPage from "@/components/ErrorPage";
import { useCartStore } from "@/utils/store";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
// import ConfettiExplosion from "react-confetti-explosion";

const SuccessPage = () => {
  try {
    const router = useRouter();
    const searchParams = useSearchParams()!;
    const payment_intent = searchParams.get("payment_intent");
    const { clearCart } = useCartStore();

    useEffect(() => {
      useCartStore.persist.rehydrate();
    }, []);

    useEffect(() => {
      const makeRequest = async () => {
        try {
          await fetch(`/api/confirm/${payment_intent}`, {
            method: "PUT",
          });
          setTimeout(() => {
            clearCart();
            router.push("/orders");
          }, 5000);
        } catch (err) {
          console.log(err);
        }
      };

      makeRequest();
    }, [payment_intent, router]);

    return (
      <>
        <div className="min-h-[calc(100vh-6rem)] md:min-h-[calc(100vh-15rem)] flex items-center justify-center text-center text-2xl text-green-700">
          <p className="max-w-[600px]">
            Payment successful. You are being redirected to the orders page.
            Please do not close the page.
          </p>
          {/* <ConfettiExplosion className="absolute m-auto"
        /> */}
        </div>
      </>
    );
  } catch (error) {
    console.log(error);
    return <ErrorPage />;
  }
};

export default SuccessPage;

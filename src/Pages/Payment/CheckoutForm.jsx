import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useUser from "../../hooks/useUser";
import Swal from "sweetalert2";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const CheckoutForm = () => {
    const stripe = useStripe();
    const [user] = useUser();
    const elements = useElements();
    const [error, setError] = useState("");   
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate();

    const paymentMutation = useMutation({
        mutationFn: (payment) => {
            return axiosSecure.post("/payments", payment);
        },
    });

    const userMutation = useMutation({
        mutationFn: (email) => {
            console.log(email);
            return axiosSecure.patch(`/user/membership/${email}`);
        },
        onSuccess: () => {
            navigate("/");
            Swal.fire({
                icon: "success",
                title: "Membership activated successfully",
            });
        },
        onError: () => {
            Swal.fire({
                icon: "error",
                title: "Failed to activate membership",
            });
        }
    });

    const [clientSecret, setClientSecret] = useState("");

    const price = 4.99;

    useEffect(() => {
        axiosSecure.post("/create-payment-intent",{price: price})
        .then((res) => {
            setClientSecret(res.data.clientSecret);
        })
        .catch((err) => {
            setError(err.message);
        })
    }, [axiosSecure,price])

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);

        if (!card) {
            return;
        }

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: card,
        });

        if (error) {
            setError(error.message);
        }
        else {
            console.log('[PaymentMethod]', paymentMethod);
            setError("");
        }

        const { paymentIntent, error: confirmError} = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: user?.name || "anonymous",
                    email: user?.email || "anonymous",
                },

            }
        });

        if (confirmError) {
            setError(confirmError.message);
        }
        else {
            if (paymentIntent?.status === "succeeded") {
                setError("");
                console.log("Payment succeeded");
                const payment = {
                    user: user?.email,
                    amount: price,
                    transaction_id: paymentIntent.id,
                    date: new Date().toISOString(),
                };
                paymentMutation.mutate(payment);
                userMutation.mutate(user.email);
            }
        }



    }
    return (
        <div className="min-h-[70vh] flex justify-center items-center">
            <div className="bg-gray-100 rounded-xl p-9 max-w-[30rem] w-[97%] mx-auto">
            <h1 className="text-center text-2xl font-medium text-black text-opacity-80 my-4">Pay By Card</h1>
            <hr className="py-4 text-black"/>
        <form onSubmit={handleSubmit}>
            <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: 'black',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
        />
        <div className="w-full flex justify-center items-center mt-8 mb-3">
        <button type="submit" disabled={!stripe || !clientSecret} className="rounded text-xl bg-customBlue px-5 text-white hover:text border-black border-[1px] py-1 hover:bg-indigo-950">
            Pay
        </button>
        </div>
        {error && <p className="text-red-400">{error}</p>}
        </form>
        </div>
        </div>
    );
};

export default CheckoutForm;
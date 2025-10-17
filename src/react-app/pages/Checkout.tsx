import { useState, useEffect } from 'react';
import { useCart } from '@/react-app/hooks/useCart';
import { CreditCard, Lock, CheckCircle } from 'lucide-react';
import { loadStripe, Stripe, StripeElements, StripePaymentElement } from '@stripe/stripe-js';

export default function Checkout() {
  const { state, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
  });
  const [stripe, setStripe] = useState<Stripe | null>(null);
  const [elements, setElements] = useState<StripeElements | null>(null);
  const [clientSecret, setClientSecret] = useState<string>('');
  const [paymentElement, setPaymentElement] = useState<StripePaymentElement | null>(null);
  const [stripeError, setStripeError] = useState<string>('');

  useEffect(() => {
    const initializeStripe = async () => {
      try {
        const response = await fetch('/api/stripe/public-key');
        if (!response.ok) {
          throw new Error('Failed to fetch Stripe public key');
        }
        const { publicKey } = await response.json();
        if (!publicKey) {
          throw new Error('No Stripe public key received');
        }
        const stripeInstance = await loadStripe(publicKey);
        if (!stripeInstance) {
          throw new Error('Failed to initialize Stripe');
        }
        setStripe(stripeInstance);
      } catch (error) {
        console.error('Failed to initialize Stripe:', error);
        setStripeError('Failed to initialize payment system. Please refresh the page.');
      }
    };

    initializeStripe();
  }, []);

  useEffect(() => {
    if (stripe && clientSecret) {
      try {
        const elementsInstance = stripe.elements({
          clientSecret: clientSecret,
          appearance: {
            theme: 'stripe',
            variables: {
              colorPrimary: '#374151',
              colorBackground: '#ffffff',
              colorText: '#374151',
              colorDanger: '#dc2626',
              fontFamily: 'Source Sans Pro, sans-serif',
              borderRadius: '0px',
            },
          },
        });
        setElements(elementsInstance);

        const payment = elementsInstance.create('payment', {
          fields: {
            billingDetails: 'auto',
          },
        });
        setPaymentElement(payment);
      } catch (error) {
        console.error('Failed to create Stripe elements:', error);
        setStripeError('Failed to initialize payment form. Please refresh the page.');
      }
    }
  }, [stripe, clientSecret]);

  const formatPrice = (priceInCents: number) => {
    return `$${(priceInCents / 100).toFixed(2)}`;
  };

  const totalAmount = state.total;
  const itemCount = state.items.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const createPaymentIntent = async () => {
      if (totalAmount > 0) {
        try {
          const response = await fetch('/api/stripe/create-payment-intent', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              amount: totalAmount,
              currency: 'usd',
              metadata: {
                items: state.items.map(item => `${item.name} x${item.quantity}`).join(', ')
              },
            }),
          });

          if (!response.ok) {
            throw new Error('Failed to create payment intent');
          }

          const data = await response.json();
          if (!data.client_secret) {
            throw new Error('No client secret received');
          }
          setClientSecret(data.client_secret);
        } catch (error) {
          console.error('Failed to create payment intent:', error);
          setStripeError('Failed to initialize payment. Please refresh the page.');
        }
      }
    };

    createPaymentIntent();
  }, [totalAmount, state.items]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!stripe || !clientSecret || !elements) {
      setStripeError('Payment system is not ready. Please try again.');
      return;
    }

    setIsProcessing(true);
    setStripeError('');

    try {
      // Confirm the payment with Stripe Elements
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements: elements,
        confirmParams: {
          return_url: `${window.location.origin}/checkout`,
          payment_method_data: {
            billing_details: {
              name: `${formData.firstName} ${formData.lastName}`,
              email: formData.email,
              address: {
                line1: formData.address,
                city: formData.city,
                state: formData.state,
                postal_code: formData.zipCode,
                country: 'US',
              },
            },
          },
        },
        redirect: 'if_required',
      });

      if (error) {
        console.error('Payment failed:', error);
        setStripeError(`Payment failed: ${error.message}`);
        return;
      }

      if (paymentIntent && paymentIntent.status === 'succeeded') {
        // Create order after successful payment
        const orderData = {
          email: formData.email,
          shipping_name: `${formData.firstName} ${formData.lastName}`,
          shipping_address: `${formData.address}, ${formData.city}, ${formData.state} ${formData.zipCode}`,
          items: state.items.map(item => ({
            product_id: item.id,
            quantity: item.quantity,
          })),
          payment_intent_id: paymentIntent.id,
        };

        const orderResponse = await fetch('/api/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(orderData),
        });

        if (!orderResponse.ok) {
          throw new Error('Failed to create order');
        }

        setOrderComplete(true);
        clearCart();
      }
    } catch (error) {
      console.error('Checkout error:', error);
      setStripeError('There was an error processing your order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (state.items.length === 0 && !orderComplete) {
    return (
      <div className="min-h-screen py-12 px-6 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center py-20">
            <h1 className="text-4xl font-source font-semibold text-gray-800 mb-4">
              Your bag is empty
            </h1>
            <p className="text-gray-600 mb-8 font-source">
              Add some items to your bag before proceeding to checkout.
            </p>
            <a
              href="/products"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-lumina-200 to-lumina-300 hover:from-lumina-300 hover:to-lumina-400 text-gray-800 font-semibold transition-all duration-300 shadow-soft hover:shadow-glow button-sharp font-source"
            >
              <span>Start Shopping</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (orderComplete) {
    // Scroll to top when order is complete
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
    
    return (
      <div className="min-h-screen py-12 px-6 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center py-20 animate-fade-in">
            <div className="mb-8">
              <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6" />
            </div>
            <h1 className="text-4xl font-source font-semibold text-gray-800 mb-4">
              Order Complete!
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto font-source">
              Thank you for your order! We're excited to send you these beautiful pieces. 
              You'll receive a confirmation email shortly with your order details.
            </p>
            <a
              href="/"
              className="inline-flex items-center space-x-2 px-8 py-4 btn-primary font-semibold transition-all duration-300 shadow-soft hover:shadow-glow font-source"
            >
              <span>Continue Shopping</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-6 bg-white">
      <div className="container mx-auto max-w-6xl">
        {/* Page Header */}
        <div className="mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-source font-semibold text-gray-800 mb-4">
            Checkout
          </h1>
          <p className="text-gray-600 font-source">
            Complete your order for {itemCount} item{itemCount !== 1 ? 's' : ''}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Checkout Form */}
          <div className="space-y-8 animate-slide-up">
            {/* Contact Information */}
            <div className="bg-white p-8 shadow-soft border border-gray-100 card-sharp">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 font-source">
                Contact Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all duration-300 button-sharp font-source"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
            </div>

            {/* Shipping Information */}
            <div className="bg-white p-8 shadow-soft border border-gray-100 card-sharp">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 font-source">
                Shipping Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all duration-300 button-sharp font-source"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all duration-300 button-sharp font-source"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all duration-300 button-sharp font-source"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all duration-300 button-sharp font-source"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    required
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all duration-300 button-sharp font-source"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    required
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-300 focus:border-transparent transition-all duration-300"
                  />
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="bg-white p-8 shadow-soft border border-gray-100 card-sharp">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center space-x-2 font-source">
                <CreditCard className="w-6 h-6" />
                <span>Payment</span>
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-2 mb-4">
                  <Lock className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-gray-600 font-source">Secure payment processing</span>
                </div>

                {/* Error Display */}
                {stripeError && (
                  <div className="bg-red-50 border border-red-200 p-4 mb-4 card-sharp">
                    <p className="text-red-600 text-sm font-source">{stripeError}</p>
                  </div>
                )}

                {/* Stripe Payment Element */}
                <div className="border border-gray-200 p-4 card-sharp bg-white">
                  <div 
                    id="payment-element"
                    ref={(ref) => {
                      if (ref && paymentElement && !ref.hasChildNodes()) {
                        paymentElement.mount(ref);
                      }
                    }}
                    className="min-h-[40px]"
                  />
                </div>
                
                <p className="text-xs text-gray-500 font-source">
                  Your payment information is encrypted and secure. We never store your card details.
                </p>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="bg-gray-50 p-8 shadow-soft sticky top-24 card-sharp border border-gray-100">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 font-source">
                Order Summary
              </h2>

              {/* Cart Items */}
              <div className="space-y-4 mb-6">
                {state.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <img
                      src={item.image_url || '/placeholder-product.jpg'}
                      alt={item.name}
                      className="w-16 h-16 object-cover card-sharp"
                      
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-800">{item.name}</h3>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-semibold text-gray-800">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <hr className="border-pink-200 mb-6" />

              {/* Totals */}
              <div className="space-y-3 mb-8">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold text-gray-800">
                    {formatPrice(totalAmount)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold text-green-600">Free</span>
                </div>
                <div className="flex justify-between text-xl pt-3 border-t border-pink-200">
                  <span className="font-semibold text-gray-800">Total</span>
                  <span className="font-bold text-gray-800">
                    {formatPrice(totalAmount)}
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing || !stripe || !clientSecret || !elements || !!stripeError}
                className="w-full flex items-center justify-center space-x-3 px-6 py-4 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white disabled:text-gray-600 font-semibold transition-all duration-300 shadow-soft hover:shadow-glow transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed button-sharp font-source"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin w-5 h-5 border-2 border-gray-400 border-t-gray-600"></div>
                    <span>Processing Payment...</span>
                  </>
                ) : !stripe || !clientSecret || !elements ? (
                  <>
                    <div className="animate-spin w-5 h-5 border-2 border-gray-400 border-t-gray-600"></div>
                    <span>Loading Payment...</span>
                  </>
                ) : stripeError ? (
                  <>
                    <span>Fix errors to continue</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5" />
                    <span>Complete Payment {formatPrice(totalAmount)}</span>
                  </>
                )}
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                By completing your order, you agree to our terms of service.
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

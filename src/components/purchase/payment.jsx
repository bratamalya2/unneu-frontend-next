/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import cashfreePaymentService from '../../../unneu-backend-main/utils/cashfreeService';
import { useUnneuDataStore } from '@/store/store';

const Payment = () => {
  const [selectedPayment, setSelectedPayment] = useState('upi');
  const [sameAsShipping, setSameAsShipping] = useState(false);
  const [saveCard, setSaveCard] = useState(false);
  const router = useRouter()
  const [paymentStatus, setPaymentStatus] = useState(null);
  const cart = useUnneuDataStore(state => state.cart);
  const [totalAmount, setTotalAmount] = useState(0);
  const [orderId, setOrderId] = useState(null);
 // New state for user details
    const [userDetails, setUserDetails] = useState({
      email: '',
      fullName: '',
      address: {
        street: '',
        city: '',
        state: '',
        zipCode: ''
      },
      phoneNumber: ''
    });

// Fetch user details from localStorage on component mount
useEffect(() => {
  // Retrieve shipping address from localStorage
  const shippingAddress = localStorage.getItem('shippingAddress');
  
  if (shippingAddress) {
    try {
      const parsedAddress = JSON.parse(shippingAddress);
      
      // Format full name and address details
      setUserDetails({
        email: parsedAddress.email || '',
        fullName: `${parsedAddress.firstName} ${parsedAddress.lastName}`.trim(),
        address: {
          street: `${parsedAddress.address1} ${parsedAddress.address2 || ''}`.trim(),
          city: parsedAddress.city || '',
          state: parsedAddress.state || '',
          zipCode: parsedAddress.zipCode || '',
          country: parsedAddress.country || ''
        },
        phoneNumber: parsedAddress.phoneNumber || ''
      });
    } catch (error) {
      console.error('Error parsing shipping address:', error);
    }
  }
}, []);


  useEffect(() => {
      const calculateTotal = async () => {
          try {
              const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/calculate-cart-total`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ cart })
              });
              const data = await response.json();
              setTotalAmount(data.totalAmount);
          } catch (error) {
              console.error('Total calculation error:', error);
          }
      };

      // Fetch user details
      const fetchUserDetails = async () => {
          try {
              const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user-details`, {
                  method: 'GET',
                  headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } // Assuming token-based auth
              });
              const data = await response.json();
              setUserDetails(data); // Update state with fetched user details
          } catch (error) {
              console.error('Error fetching user details:', error);
          }
      };

      calculateTotal();
      fetchUserDetails(); // Call to fetch user details
  }, [cart]);

  const initiatePayment = async () => {
      try {
          // Generate unique order ID
          const newOrderId = `ORDER_${Date.now()}`;
          setOrderId(newOrderId);

          // Use fetched user details in orderDetails
          const orderDetails = {
              orderId: newOrderId,
              totalAmount: totalAmount,
              customerId: userDetails.phoneNumber || 'user_123', // Use actual user ID
              email: userDetails.email || 'user@example.com', // Use actual user email
              phone: userDetails.phoneNumber || '9999999999' // Use actual user phone
          };

          // Initiate Cashfree payment
          await cashfreePaymentService.initializePayment(orderDetails);

          // Optional: Track payment status
          setPaymentStatus('INITIATED');
      } catch (error) {
          console.error('Payment initiation failed:', error);
          setPaymentStatus('FAILED');
          alert('Payment initialization failed');
      }
  };

  // Payment verification after return
  useEffect(() => {
      const verifyPayment = async () => {
          if (orderId) {
              try {
                  const verificationResult = await cashfreePaymentService.verifyPayment(orderId);
                  if (verificationResult.success) {
                      // Payment successful - redirect to order confirmation
                      router.push(`/order-confirmation?orderId=${orderId}`);
                  } else {
                      // Handle different payment scenarios
                      setPaymentStatus(verificationResult.status);
                  }
              } catch (error) {
                  console.error('Payment verification error:', error);
                  setPaymentStatus('VERIFICATION_FAILED');
              }
          }
      };
      verifyPayment();
  }, [orderId, router]);

  return (
    <div className="max-w-[600px] mx-auto p-6 ml-20">
      <div className="mb-8 border-2 border-[#FE9135] rounded-md drop-shadow-md">
        <h2 className="text-2xl font-semibold mb-4 py-3 ml-3">Billing & Shipping address</h2>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <span className="text-orange-400">{userDetails.email}</span>
            <button className="text-blue-600" 
             onClick={() => {
              // Force a full page reload to the address page
              window.location.href = '/purchase?slug=address';
            }}
            >Edit</button>
          </div>
          <div className="text-gray-600">
            <p>{userDetails.fullName}</p>
            <p>{userDetails.address.street}</p>
            <p>{`${userDetails.address.city}, ${userDetails.address.state}, ${userDetails.address.zipCode}`}</p>
            <p>{userDetails.address.country}</p>
          </div>
          <div className="mt-4">
            <p className="font-medium">Contact Number</p>
            <p className="text-gray-600">{userDetails.phoneNumber}</p>
            <p className="font-medium">Delivery time</p>
            <p className="text-gray-600">Est. arrival 7-10 business day</p>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Payment methods</h2>
        
        {/* UPI Option */}
        <div 
          className={`border rounded-lg p-4 mb-3 cursor-pointer ${
            selectedPayment === 'upi' ? 'border-orange-400' : 'border-gray-200'
          }`}
          onClick={() => setSelectedPayment('upi')}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src="/upi-icon.svg" alt="UPI" className="h-6" />
              <span>Pay with installed apps or others</span>
            </div>
            <div className={`w-5 h-5 rounded-full border-2 ${
              selectedPayment === 'upi' ? 'border-orange-400' : 'border-gray-300'
            } flex items-center justify-center`}>
              {selectedPayment === 'upi' && (
                <div className="w-3 h-3 rounded-full bg-orange-400" />
              )}
            </div>
          </div>

          <AnimatePresence>
            {selectedPayment === 'upi' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 grid grid-cols-4 gap-4"
              >
                <div className="text-center">
                  <img src="/gpay.jpeg" alt="Google Pay" className="h-8 mx-auto" />
                  <span className="text-sm">Google pay</span>
                </div>
                <div className="text-center">
                  <img src="/PhonePe.jpeg" alt="PhonePe" className="h-8 mx-auto" />
                  <span className="text-sm">PhonePe</span>
                </div>
                <div className="text-center">
                  <img src="/paytmlogo.png" alt="Paytm" className="h-8 mx-auto" />
                  <span className="text-sm">Paytm</span>
                </div>
                <div className="text-center">
                  <div className="h-8 w-8 mx-auto bg-gray-200 rounded-full flex items-center justify-center">
                    <span>...</span>
                  </div>
                  <span className="text-sm">Other</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Credit/Debit Card Option */}
        <div 
          className={`border rounded-lg p-4 mb-3 cursor-pointer ${
            selectedPayment === 'card' ? 'border-orange-400' : 'border-gray-200'
          }`}
          onClick={() => setSelectedPayment('card')}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src="/mc_symbol.svg" alt="Card" className="h-6" />
              <div>
                <div>Credit / Debit Card</div>
                <div className="text-sm text-gray-500">Visa, Master, Amex</div>
              </div>
            </div>
            <div className={`w-5 h-5 rounded-full border-2 ${
              selectedPayment === 'card' ? 'border-orange-400' : 'border-gray-300'
            } flex items-center justify-center`}>
              {selectedPayment === 'card' && (
                <div className="w-3 h-3 rounded-full bg-orange-400" />
              )}
            </div>
          </div>
        </div>

        {/* Net Banking Option */}
        <div 
          className={`border rounded-lg p-4 mb-3 cursor-pointer ${
            selectedPayment === 'netbanking' ? 'border-orange-400' : 'border-gray-200'
          }`}
          onClick={() => setSelectedPayment('netbanking')}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src="/netbanking.png" alt="Net Banking" className="h-6" />
              <div>
                <div>Net banking</div>
                <div className="text-sm text-gray-500">All Indian banks</div>
              </div>
            </div>
            <div className={`w-5 h-5 rounded-full border-2 ${
              selectedPayment === 'netbanking' ? 'border-orange-400' : 'border-gray-300'
            } flex items-center justify-center`}>
              {selectedPayment === 'netbanking' && (
                <div className="w-3 h-3 rounded-full bg-orange-400" />
              )}
            </div>
          </div>
        </div>

        <div className="mt-4">
          <label className="flex items-center gap-2 text-gray-600">
            <input
              type="checkbox"
              checked={saveCard}
              onChange={(e) => setSaveCard(e.target.checked)}
              className="rounded border-gray-300"
            />
            Save this card for future checkout
          </label>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Billing address</h2>
        <div className="mb-4">
          <label className="flex items-center gap-2 text-gray-600">
            <input
              type="checkbox"
              checked={sameAsShipping}
              onChange={(e) => setSameAsShipping(e.target.checked)}
              className="rounded border-gray-300"
            />
            Same as the shipping address
          </label>
        </div>

        <AnimatePresence>
          {!sameAsShipping && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-gray-600 mb-4">Please enter a billing address</p>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="First name *"
                  className="p-3 border rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Last name *"
                  className="p-3 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Address 1 *"
                  className="p-3 border rounded-lg w-full"
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Address 2 (optional)"
                  className="p-3 border rounded-lg w-full"
                />
                <div className="text-sm text-gray-500 mt-1">Additional info: building, apartment, unit</div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="City *"
                  className="p-3 border rounded-lg"
                />
                <select
                  className="p-3 border rounded-lg bg-white"
                  defaultValue=""
                >
                  <option value="" disabled>State *</option>
                </select>
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Zip code *"
                  className="p-3 border rounded-lg"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <button className="w-full bg-orange-400 text-white py-4 rounded-lg font-medium">
        Confirm your order
      </button>
    </div>
  );
};

export default Payment;
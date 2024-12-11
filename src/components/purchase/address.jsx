import { useEffect, useState } from 'react';
import { Libre_Baskerville } from "next/font/google";
import OrderSummary from './orderSummary';
import { Poppins } from "next/font/google";
const axios = require('axios');

const lbFont = Libre_Baskerville({ subsets: ["latin"], weight: ["400", "700"] });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"]
});

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'

const AddressForm = ({ onNextStage }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  });


  // // Fetch existing address when component mounts
  // useEffect(() => {
  //   const fetchExistingAddress = async () => {
  //     try {
  //       const response = await axios.get(`${backendUrl}/buyer/getAddress`, {
  //         headers: {
  //           'Authorization': `Bearer ${localStorage.getItem('token')}` // Adjust token retrieval as per your auth mechanism
  //         }
  //       });

  //       if (response.data.success) {
  //         setFormData(response.data.addressDetails);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching address:', error);
  //       // Optionally handle error (e.g., show a notification)
  //     }
  //   };

  //   fetchExistingAddress();
  // }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'phoneNumber', 'address1', 'city', 'state', 'zipCode', 'country'];
    const isValid = requiredFields.every(field => formData[field].trim() !== '');
  
    if (isValid) {
      try {
        // Retrieve tokens from localStorage
        const jwtToken = localStorage.getItem('jwttoken');
        const refreshToken = localStorage.getItem('refreshtoken');
       
        // Validate both tokens are present
        if (!jwtToken || !refreshToken) {
          alert('Authentication tokens are missing. Please log in again.');
          return;
        }
  
        // Determine which route to use based on existing address
        const storedAddress = localStorage.getItem('shippingAddress');
        const routeUrl = storedAddress 
          ? `${backendUrl}/buyer/updateAddress` 
          : `${backendUrl}/buyer/storeAddress`;
        
        const method = storedAddress ? 'PUT' : 'POST';
  
        const response = await fetch(routeUrl, {
          method: method,
          headers: {
            'Content-Type': 'application/json',
            'jwttoken': jwtToken,
            'refreshtoken': refreshToken
          },
          body: JSON.stringify(formData)
        });
  
        const result = await response.json();
  
        if (result.success) {
          // Store address in local storage as a backup
          localStorage.setItem('shippingAddress', JSON.stringify(formData));
          
          // Navigate to payment page
          window.location.href = '/purchase?slug=payment';
        } else if (result.err === 'Refresh JWT Token!') {
          // Token refresh scenario
          // Update the stored token with the new JWT
          localStorage.setItem('jwttoken', result.jwt);
          
          // Optionally, retry the address submission
          alert('Your session was refreshed. Please submit the address again.');
        } else {
          // Handle other error scenarios
          alert(result.errors ? result.errors.map(err => err.msg).join(', ') : (result.err || 'Failed to save address'));
        }
      } catch (error) {
        console.error('Error saving address:', error);
        // alert('Network error. Please check your connection.');
      }
    } else {
      alert('Please fill in all required fields');
    }
  };

  return (
    <div className="w-full px-[5%] py-8 flex flex-col lg:flex-row gap-8" onSubmit={handleSubmit}>
      <section className="w-full lg:w-3/5">
        <p className={`${poppins.className} text-2xl lg:text-4xl font-semibold lg:font-bold`}>
          Add Address
        </p>
        <p className={`${lbFont.className} text-sm lg:text-sm mt-2 font-semibold lg:font-semibold`}>
          You can change address later, from <span className="text-red-500">Profile</span> section
        </p>

        {/* Email Field */}
        <div className="flex flex-col mt-[32px]">
          <label htmlFor="email" className="text-sm font-medium mb-[8px]">Email *</label>
          <input 
            type="email" 
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email address"
            className="w-full h-[50px] px-[24px] rounded-[16px] bg-[#F8F8F8] border border-gray-300"
            required
          />
        </div>

        {/* Shipping & Delivery Section */}
        <div className="mt-[32px]">
          <p className={`${poppins.className} text-xl font-semibold`}>Shipping & Delivery</p>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-[24px]">
            <div className="flex flex-col">
              <label htmlFor="firstName" className="text-sm font-medium mb-[8px]">First Name *</label>
              <input 
                type="text" 
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter first name"
                className="w-full h-[50px] px-[24px] rounded-[16px] bg-[#F8F8F8] border border-gray-300"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="lastName" className="text-sm font-medium mb-[8px]">Last Name *</label>
              <input 
                type="text" 
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter last name"
                className="w-full h-[50px] px-[24px] rounded-[16px] bg-[#F8F8F8] border border-gray-300"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="phoneNumber" className="text-sm font-medium mb-[8px]">Phone Number *</label>
              <input 
                type="tel" 
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Enter phone number"
                className="w-full h-[50px] px-[24px] rounded-[16px] bg-[#F8F8F8] border border-gray-300"
                required
              />
            </div>
            <div className="flex flex-col col-span-full">
              <label htmlFor="address1" className="text-sm font-medium mb-[8px]">Address 1 *</label>
              <input 
                type="text" 
                id="address1"
                name="address1"
                value={formData.address1}
                onChange={handleChange}
                placeholder="Enter street address"
                className="w-full h-[50px] px-[24px] rounded-[16px] bg-[#F8F8F8] border border-gray-300"
                required
              />
            </div>
            <div className="flex flex-col col-span-full">
              <label htmlFor="address2" className="text-sm font-medium mb-[8px]">Address 2 (optional)</label>
              <input 
                type="text" 
                id="address2"
                name="address2"
                value={formData.address2}
                onChange={handleChange}
                placeholder="Enter additional address details"
                className="w-full h-[50px] px-[24px] rounded-[16px] bg-[#F8F8F8] border border-gray-300"
              />
            </div>
            <p className={`${lbFont.className} text-xs lg:text-sm col-span-full mt-2 font-normal lg:font-normal`}>
              Additional info: building, apartments, roads
            </p>
            <div className="flex flex-col">
              <label htmlFor="city" className="text-sm font-medium mb-[8px]">City *</label>
              <input 
                type="text" 
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Enter city"
                className="w-full h-[50px] px-[24px] rounded-[16px] bg-[#F8F8F8] border border-gray-300"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="state" className="text-sm font-medium mb-[8px]">State *</label>
              <select 
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full h-[50px] px-[24px] rounded-[16px] bg-[#F8F8F8] border border-gray-300"
                required
              >
                <option value="">Select State</option>
                <option value="Andhra Pradesh">Andhra Pradesh</option>
                <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                <option value="Assam">Assam</option>
                <option value="Bihar">Bihar</option>
                <option value="Chhattisgarh">Chhattisgarh</option>
                <option value="Goa">Goa</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Haryana">Haryana</option>
                <option value="Himachal Pradesh">Himachal Pradesh</option>
                <option value="Jharkhand">Jharkhand</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Kerala">Kerala</option>
                <option value="Madhya Pradesh">Madhya Pradesh</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Manipur">Manipur</option>
                <option value="Meghalaya">Meghalaya</option>
                <option value="Mizoram">Mizoram</option>
                <option value="Nagaland">Nagaland</option>
                <option value="Odisha">Odisha</option>
                <option value="Punjab">Punjab</option>
                <option value="Rajasthan">Rajasthan</option>
                <option value="Sikkim">Sikkim</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Telangana">Telangana</option>
                <option value="Tripura">Tripura</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="Uttarakhand">Uttarakhand</option>
                <option value="West Bengal">West Bengal</option>

              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="zipCode" className="text-sm font-medium mb-[8px]">Zip Code *</label>
              <input 
                type="text" 
                id="zipCode"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                placeholder="Enter zip code"
                className="w-full h-[50px] px-[24px] rounded-[16px] bg-[#F8F8F8] border border-gray-300"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="country" className="text-sm font-medium mb-[8px]">Country *</label>
              <select 
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full h-[50px] px-[24px] rounded-[16px] bg-[#F8F8F8] border border-gray-300"
                required
              >
                <option value="">Select Country</option>
                <option value="India">India</option>
                <option value="United States">United States</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Canada">Canada</option>
                <option value="Australia">Australia</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="col-span-full flex items-center mt-[16px]">
              <input 
                type="checkbox" 
                id="sameAsBilling"
                name="sameAsBilling"
                className="mr-[12px]"
              />
              <label htmlFor="sameAsBilling" className="text-sm">
                My billing address is the same as my shipping address
              </label>
            </div>
            <div className="col-span-full mt-[32px]">
              <button 
                type="submit"
                className="w-full py-[12px] rounded-[16px] bg-[#FE9135] text-white font-semibold text-[18px] hover:bg-[#FF7F00] transition-colors"
                onClick={() => window.open('/purchase?slug=payment', { 
                  scroll: false, // Prevent automatic scrolling
                  shallow: true // Lightweight navigation
              })
              }
              >
                Continue to Payment &#8594;
              </button>
            </div>
          </form>
        </div>
      </section>
      <OrderSummary />
    </div>
  );
}
export default AddressForm;
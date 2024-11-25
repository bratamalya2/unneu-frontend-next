import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUnneuDataStore = create(
    persist(
        (set) => ({
            bodyOpacity: 1,
            phoneNumber: "",
            jwtToken: "",
            refreshToken: "",
            isSellerSelected: false,
            sellerProfilePhoto: null,
            sellerCoverPhoto: null,
            showSignIn: false,
            showSignUp: false,
            cart: [],
            showHamburger: false,
            setShowHamburger: (p) => set({ showHamburger: p }),
            setBodyOpacity: (p) => set({ bodyOpacity: p }),
            setShowSignIn: (p) => set({ showSignIn: p }),
            setShowSignUp: (p) => set({ showSignUp: p }),
            setPhoneNumber: (p) => set({ phoneNumber: p }),
            setJwtToken: (token) => set({ jwtToken: token }),
            setRefreshToken: (token) => set({ refreshToken: token }),
            setBuyerSelected: () => set({ isSellerSelected: false }),
            setSellerSelected: () => set({ isSellerSelected: true }),
            setSellerProfilePhoto: (p) => set({ sellerProfilePhoto: p }),
            setSellerCoverPhoto: (p) => set({ sellerCoverPhoto: p }),
            addToCart: (p) => set((state) => {
                if (!state.cart.find(x => x === p))
                    return {
                        cart: [...state.cart, p]
                    };
                else
                    return {
                        cart: state.cart
                    };
            }),
            removeFromCart: (p) => set((state) => {
                console.log(p);
                let arr = [...state.cart];
                console.log(arr);
                arr = arr.filter(x => x !== p);
                return {
                    cart: arr
                }
            })
        }),
        {
            name: "unneuDataStore"
        }
    )
);
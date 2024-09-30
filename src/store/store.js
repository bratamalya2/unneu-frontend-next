import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUnneuDataStore = create(
    persist(
        (set) => ({
            phoneNumber: "",
            jwtToken: "",
            refreshToken: "",
            isSellerSelected: false,
            sellerProfilePhoto: null,
            sellerCoverPhoto: null,
            showSignIn: false,
            showSignUp: false,
            setShowSignIn: (p) => set({ showSignIn: p }),
            setShowSignUp: (p) => set({ showSignUp: p }),
            setPhoneNumber: (p) => set({ phoneNumber: p }),
            setJwtToken: (token) => set({ jwtToken: token }),
            setRefreshToken: (token) => set({ refreshToken: token }),
            setBuyerSelected: () => set({ isSellerSelected: false }),
            setSellerSelected: () => set({ isSellerSelected: true }),
            setSellerProfilePhoto: (p) => set({ sellerProfilePhoto: p }),
            setSellerCoverPhoto: (p) => set({ sellerCoverPhoto: p })
        }),
        {
            name: "unneuDataStore"
        }
    )
);
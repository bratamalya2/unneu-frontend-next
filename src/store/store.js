import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUnneuDataStore = create(
    persist(
        (set) => ({
            jwtToken: "",
            refreshToken: "",
            isSellerSelected: true,
            setJwtToken: (token) => set({ jwtToken: token }),
            setRefreshToken: (token) => set({ refreshToken: token }),
            setBuyerSelected: () => set({ isSellerSelected: false }),
            setSellerSelected: () => set({ isSellerSelected: true })
        }),
        {
            name: "unneuDataStore"
        }
    )
);
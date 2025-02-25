// In this file having a bunch of  state and functions that we can reuse it in components files
import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
// import axios from "axios";
import toast from "react-hot-toast";
import {io} from "socket.io-client";



const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";

// custom hooks
export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIng: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  //While refersh the page checking user login or not show then {shimmer} for that creating a functions
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.log("Error in checkAuth", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created successfully");

      //When user signup then connect to socket.io
      //connectiong to the server that you are online
      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  //When the user login direct connect to socket.io
  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully");
      // When user login then connect to socket.io
      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
      get().disconnectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("error in update profile:", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

connectSocket: () => {
    //If there is not authUser dont try to create it
    const {authUser} = get();
  
    if (!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL,{
      query:{
        userId: authUser._id,
      }
    });
   socket.connect()

   set({socket: socket})
    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });

  },

  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
  
}));

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useUserStorage = create(
    persist(
        (set, get) => ({
            user: JSON.parse(localStorage.getItem("user")) || null,
            setUser: (userData) => {
                localStorage.setItem("user", JSON.stringify(userData));
                set({ user: userData });
            },
            getUser: () => get().user,
            getUserId: () => get().user ? get().user.id : "",
            getUserProjectId: () => get().user ? get().user.projectId : "",
            signOut: () => {
                localStorage.removeItem("user");
                set({ user: null });
            },
            getUserRole: () => get().user ? get().user.userRole : "",
            isAdminLogin: () =>
                get().user && get().user.userRole === "ADMIN" ? true : false,
            isEmployeeLoggedIn: () =>
                get().user && get().user.userRole === "EMPLOYEE" ? true : false,
            isMangerLoggedIn: () =>
                get().user && get().user.userRole === "MANAGER" ? true : false,


        }),

        {
            name: "user-storage",
        }

    )
)
export default useUserStorage;
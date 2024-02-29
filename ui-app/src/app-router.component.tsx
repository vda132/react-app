import { Route, BrowserRouter, Routes } from "react-router-dom";
import { Main } from "./main/main.page";
import { Home } from "./main/home/home.page";
import { Profile } from "./user/profile/profile.page";
import { Product } from "./main/product/product.page";
import { DashBoard } from "./dashboard/dashboard";
import { DashboardMain } from "./dashboard/pages/dashboard-main.page";
import { useAdmin } from "./hooks/useAdmin";
import { Markets } from "./dashboard/pages/markets/markets.page";

export default function AppRouter() {
    const isAdmin = useAdmin();

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main />}>
                    <Route index element={<Home />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="product" element={<Product />} />
                </Route>
                {isAdmin &&
                    <Route path='dashboard' element={<DashBoard />}>
                        <Route index element={<DashboardMain />} />
                        <Route path='markets' element={<Markets />}/>
                    </Route>}
            </Routes>
        </BrowserRouter>
    )
}
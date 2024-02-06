import { Route, BrowserRouter, Routes } from "react-router-dom";
import { Main } from "./main.page";
import { Home } from "./home.page";
import { Profile } from "./user/profile/profile.page";

export default function AppRouter() {
    return (
        <BrowserRouter >
            <Routes>
                <Route path="/" element={<Main />}>
                    <Route index element={<Home />}/>
                    <Route path="profile" element={<Profile />}/>
                </Route>
            </Routes>
        </BrowserRouter >
    )
}
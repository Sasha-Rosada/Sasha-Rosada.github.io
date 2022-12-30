import { Outlet } from "react-router";
import { Header } from "./Header";
import Snowfall from "./Snowfall";

export function Layout() {
    return (
        <>
            <Header />
            <Snowfall />
            <Outlet />
        </>
    )
}
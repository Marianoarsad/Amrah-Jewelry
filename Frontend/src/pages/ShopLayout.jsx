import { Outlet } from "react-router-dom";

export default function ShopLayout() {
    return (
        <>
            <main>
                <Outlet />
            </main>
        </>
    );
}

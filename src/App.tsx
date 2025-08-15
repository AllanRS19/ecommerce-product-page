import { useState } from "react";
import MobileNav from "./components/MobileNav"
import Navbar from "./components/Navbar"

const App = () => {

    const [mobileNavOpen, setMobileNavOpen] = useState(false);

    return (
        <main className="w-full h-full">
            <MobileNav open={mobileNavOpen} setMobileNavOpen={setMobileNavOpen} />
            <Navbar setMobileNavOpen={setMobileNavOpen} />
        </main>
    )
}

export default App
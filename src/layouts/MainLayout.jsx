import React from 'react'
import Navbar from "../components/Navigation"
import Footer from "../components/Footer"

const MainLayout = ({ children }) => {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    )
}

export default MainLayout
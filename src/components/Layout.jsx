import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col bg-green-black">
            <Navbar />
            <main className="flex-grow">
                {children}
            </main>
        </div>
    );
};

export default Layout;

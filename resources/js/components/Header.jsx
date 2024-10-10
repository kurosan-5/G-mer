import React from 'react';

const Header = () => {

    const isLoggedIn = () => {
        const token = localStorage.getItem('token');
        return token !== null;
    };
    
    return(
        <nav className="p-0 navbar navbar-expand-lg h-color header shadow">
            <div className="container-fluid">
                <h2>GAMER</h2>
            </div>
            <div>
                {isLoggedIn() ? (
                    <p>you are logged in</p>
                ) : (
                    <p>you are logged out</p>
                )}
            </div>
        </nav>
    );
}

export default Header;
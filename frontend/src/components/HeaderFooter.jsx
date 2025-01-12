import React from 'react';
import '../App.css';
const Header = () => {
    return (
        <header className="header">
            <h1>To-Do List</h1>
        </header>
    );
};

const Footer = () => {
    return (
        <footer className="footer">
            <p>
                © {new Date().getFullYear()} Your Todo App. Built with ❤️ by Sharan M
            </p>
        </footer>
    );
};

export { Header, Footer };

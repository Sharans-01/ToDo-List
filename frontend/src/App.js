import React from 'react';
import './App.css'; // Import global CSS styles
import TaskList from './components/TaskList'; // Import TaskList component
import { Header, Footer } from './components/HeaderFooter'; // Import Header and Footer components

function App() {
    return (
        <div className="container">
            <Header />
            <TaskList />
            <Footer />
        </div>
    );
}

export default App;

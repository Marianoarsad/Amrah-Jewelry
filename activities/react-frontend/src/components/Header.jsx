export default function Header() {
    
    
    return (
        <header className="landing-header">
            <div className="header-container">
                <div className="logo">
                    <h2>App</h2>
                </div>
                <nav className="navigation">
                    <a href="/">Home</a>
                    <a href="/login">Login</a>
                    <a href="/login">Inventory</a>
                </nav>
                <div className="auth-section">
                    <button className="auth-section" type="button">Login</button>
                </div>
            </div>
        </header>
    )
}
export default function Footer () {
    return (
        <div>
            <footer className="landing-footer">
                <div className="footer-content">
                    <p className="footer-brand">My app</p>
                    <p className="footer-copy">&copy; {new Date().getFullYear} All rights reserved.</p>
                </div>
            </footer>
        </div>
    )
}
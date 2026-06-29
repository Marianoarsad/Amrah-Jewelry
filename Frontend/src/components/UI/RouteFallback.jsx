import { Loader2 } from "lucide-react";

// Branded loader shown briefly while the initial lazy route module loads.
export default function RouteFallback() {
    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "1rem",
                background: "#fff",
            }}
        >
            <img
                src="/amrah-logo-stand-alone.png"
                alt="Amrah"
                width="56"
                style={{ opacity: 0.9 }}
            />
            <Loader2
                size={26}
                color="#c64b50"
                style={{ animation: "amrah-spin 0.9s linear infinite" }}
            />
            <style>{`@keyframes amrah-spin { to { transform: rotate(360deg); } }`}</style>
        </div>
    );
}

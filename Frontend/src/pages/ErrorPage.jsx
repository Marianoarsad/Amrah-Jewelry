export default function ErrorPage() {
    return (
        <main
            style={{
                width: "100%",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
            }}
        >
            <h1>An error occured!</h1>
            <p>Could not find this page!</p>
        </main>
    );
}

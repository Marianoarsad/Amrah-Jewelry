export default function Page ({ id, children }) {
    
    return (
        <section id={id}>
            {children}
        </section>
    )
}
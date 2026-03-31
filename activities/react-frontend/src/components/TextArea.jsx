export default function TextArea({ error, label, props, rows, cols }) {
    return (
        <>
            <label>{label}</label>
            <textarea rows={rows} cols={cols} {...props}>
                
            </textarea>
            { error && <span>{error}</span> }
        </>
    )
}
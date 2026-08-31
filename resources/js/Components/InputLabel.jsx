export default function InputLabel({
    value,
    className = '',
    children,
    ...props
}) {
    return (
        <label
            {...props}
            className={
                `block text-[11px] font-bold uppercase tracking-[0.18em] text-black/60 ` +
                className
            }
        >
            {value ? value : children}
        </label>
    );
}

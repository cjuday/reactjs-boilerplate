interface CardHeaderProps {
    title: string;
}

export default function CardHeader({ title} :CardHeaderProps) {
    return (
        <div>
            <span className="text-arctic-blue-heavy text-xl leading-none">
                {title}
            </span>
            <hr className="mt-1 pb-2 border-border" />
        </div>
    );
}
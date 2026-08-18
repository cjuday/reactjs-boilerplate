import { Button } from "../ui";
import { useNavigate } from "react-router-dom";

interface PageHeaderProps {
    title: string;
    subTitle: string;
    button?: boolean;
    onClick?: string;
    icon?: React.ReactNode;
    buttonText?: string;
}

export default function PageHeader({ title, subTitle, button = false, onClick, icon, buttonText }: PageHeaderProps) {
    const navigate = useNavigate();

    return (
        <div className={button ? "mb-6" : "mb-2"}>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-foreground">
                        {title}
                    </h1>

                    <p className="mt-1 text-sm text-muted">
                        {subTitle}
                    </p>
                </div>

                {(button && buttonText) && (
                    <Button
                        type="button"
                        onClick={() => onClick && navigate(onClick)}
                        size="xs"
                    >
                        {icon}
                        {buttonText}
                    </Button>
                )}
            </div>

            {!button && (
                <hr className="mt-3 border-border" />
            )}
        </div>
    );
}
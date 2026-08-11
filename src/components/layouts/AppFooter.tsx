export default function AppFooter() {
    const year = new Date().getFullYear();
    const appName = import.meta.env.VITE_APP_NAME ?? 'Your Company';
    const version = import.meta.env.VITE_APP_VERSION ?? 'v1.0.0';

    return (
        <footer className="border-t border-border-subtle shadow-footer bg-surface">
            <div className="flex h-14 items-center justify-between px-4 text-sm text-muted lg:px-6">
                <span>
                    © {year} {appName}. All rights reserved.
                </span>

                <div className="flex items-center gap-4">
                    <span>{version}</span>

                    <span className="hidden lg:inline-flex items-center gap-1">
                        Made with
                        <span className="text-danger">♥</span>
                        by
                        <a
                            href="https://taiammumuday.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-foreground transition-colors hover:text-primary"
                        >
                            Taiammum Uday
                        </a>
                    </span>
                </div>
            </div>
        </footer>
    );
}
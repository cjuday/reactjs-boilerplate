export default function AppFooter() {
    const year = new Date().getFullYear();
    const appName = import.meta.env.VITE_APP_NAME ?? 'Your Company';

    return (
        <footer className="border-t border-gray-200 py-3 bg-white">
            <div className="container mx-auto px-6 text-center text-sm text-gray-500">
                <p>
                    © {year} {appName}. All rights reserved.
                </p>

                <p>
                    Made with <span className="text-red-500">♥</span> by{' '}
                    <a
                        href="https://taiammumuday.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-gray-700 transition-colors hover:text-blue-600"
                    >
                        Taiammum Uday
                    </a>
                </p>
            </div>
        </footer>
    );
}
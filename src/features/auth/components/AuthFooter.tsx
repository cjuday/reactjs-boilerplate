import { Link } from 'react-router-dom';

interface Props {
  text: string;
  linkText: string;
  to: string;
}

export default function AuthFooter({ text, linkText, to }: Props) {
  return (
    <p className="mt-6 text-center text-sm text-gray-500">
      {text}{' '}

      <Link
        to={to}
        className="font-medium text-blue-600 hover:underline"
      >
        {linkText}
      </Link>
    </p>
  );
}
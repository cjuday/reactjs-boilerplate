interface Props {
  title: string;
  description?: string;
}

export default function AuthHeader({ title, description }: Props) {
  return (
    <div className="mb-8 text-center">
      <h1 className="text-2xl font-bold">
        {title}
      </h1>

      {description && (
        <p className="mt-2 text-sm text-gray-500">
          {description}
        </p>
      )}
    </div>
  );
}
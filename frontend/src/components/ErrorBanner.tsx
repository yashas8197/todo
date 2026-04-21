interface ErrorBannerProps {
  message: string;
  onDismiss: () => void;
}

export function ErrorBanner({ message, onDismiss }: ErrorBannerProps) {
  return (
    <div className="flex items-center justify-between px-4 py-3 mb-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
      <span>{message}</span>
      <button
        onClick={onDismiss}
        className="ml-4 text-red-400 hover:text-red-600 font-medium leading-none"
        aria-label="Dismiss error"
      >
        ✕
      </button>
    </div>
  );
}
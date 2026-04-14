import './ErrorMessage.css';

export default function ErrorMessage({ message = 'Something went wrong.', onRetry }) {
  return (
    <div className="error-wrapper">
      <div className="error-icon">⚠️</div>
      <h3 className="error-title">Oops! An error occurred</h3>
      <p className="error-text">{message}</p>
      {onRetry && (
        <button className="error-retry" onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  );
}

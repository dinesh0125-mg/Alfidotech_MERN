import './LoadingSpinner.css';

export default function LoadingSpinner({ message = 'Loading...' }) {
  return (
    <div className="spinner-wrapper">
      <div className="spinner-ring">
        <div></div><div></div><div></div><div></div>
      </div>
      <p className="spinner-message">{message}</p>
    </div>
  );
}

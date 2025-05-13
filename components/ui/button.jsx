export function Button({ children, className = '', ...props }) {
  return (
    <button
      className={`bg-blue-900 text-gray-400 hover:bg-blue-600 hover:text-white font-bold px-4 py-2 rounded-md ${className}`}
      {...props}
    className={`bg-blue-900 text-gray-400 hover:bg-blue-600 hover:text-white font-bold px-4 py-2 rounded-md ${className}`}
      {...props}
    >
      {children}
      </button>
  );
}

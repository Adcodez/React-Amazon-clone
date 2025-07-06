// src/components/OrderSuccessToast.js
export default function OrderSuccessToast({ visible, onClose }) {
  if (!visible) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-3 rounded shadow-lg animate-fade-in">
      ✅ Order placed successfully!
      <button onClick={onClose} className="ml-3 font-bold">×</button>
    </div>
  );
}
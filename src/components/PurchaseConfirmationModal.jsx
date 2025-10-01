export default function PurchaseConfirmationModal({
  quantity,
  productTitle,
  onClose,
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white p-10 rounded-lg text-center shadow-2xl">
        <h2 className="text-3xl font-bold text-green-600 mb-4">
          Pedido Concluído! 🎉
        </h2>
        <p className="text-gray-700 mb-6">
          {`Sua compra foi realizada com sucesso ${quantity} 
          ${productTitle}.`}
        </p>
        <button
          onClick={onClose}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          Fechar
        </button>
      </div>
    </div>
  );
}

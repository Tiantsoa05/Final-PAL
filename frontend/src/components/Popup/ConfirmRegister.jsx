import React from 'react'

const ConfirmRegister = ({closeRegisterModal,handleRegister}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-md shadow-lg max-w-sm w-full">
        <h2 className="text-lg font-bold text-gray-800 text-center">Confirmation de l'inscription</h2>
        <p className="text-gray-600 mt-2 text-center">Confirmez-vous votre inscription?</p>
        <div className="flex justify-center space-x-4 mt-4">
            <button
                onClick={closeRegisterModal}
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
            >
            Non
            </button>
            <button
                onClick={handleRegister}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-red-700"
            >
            Oui
            </button>
        </div>
        </div>
    </div>
  )
}

export default ConfirmRegister
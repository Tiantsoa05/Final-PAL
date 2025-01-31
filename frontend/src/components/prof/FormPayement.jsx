import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const FormPayement = () => {
  const [phoneCode, setPhoneCode] = useState("+261");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [mdp, setMdp] = useState("");
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { durationFollow, priceFollow } = localStorage;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isTermsAccepted) {
      alert("Veuillez accepter les conditions générales.");
      return;
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const submitSubscribe = async () => {

    axios.post('http://localhost:3000/operations/choix_prof',{
      id_prof: parseInt(localStorage.getItem('idFollow')),
      id_etudiant: parseInt(localStorage.getItem('userId'))
    }).then(res=>{
      console.log(res.data)
      localStorage.setItem('prof', parseInt(localStorage.getItem('idFollow')))
      setPaymentSuccess(true);
      closeModal();
    }).catch(
      console.error
    )

    axios.post('http://localhost:3000/prof/subscribe',{
      duree: durationFollow,
      montant: priceFollow,
      id_prof: parseInt(localStorage.getItem('idFollow')),
      id_etudiant: parseInt(localStorage.getItem('userId'))
    }).then(res=>{
      console.log(res.data)
    })

    console.log({ durationFollow, priceFollow, phone: `${phoneCode}${phoneNumber}` });

  };

  const phoneCodes = [
    { code: "+1", country: "USA" },
    { code: "+33", country: "France" },
    { code: "+261", country: "Madagascar" },
    { code: "+44", country: "UK" },
    { code: "+49", country: "Germany" },
  ];

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">
          S'abonner au prof pour suivre ses cours
        </h2>
        <hr className="my-4 border-gray-300" />
        <h3 className="text-center border-l-8">Montant : {priceFollow} Ar</h3>
        <hr className="my-4 border-gray-300" />

        {paymentSuccess ? (
          <div>
            <p className="text-green-500 text-center">
              Merci pour votre achat ! Vous pouvez maintenant avoir accès aux cours de ce prof.
            </p>
            <Link to={"/home"}>
              <button className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-700">
                Ok
              </button>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="phone" className="block text-gray-700 font-medium">
                Numéro de Téléphone
              </label>
              <div className="flex items-center">
                <select
                  value={phoneCode}
                  onChange={(e) => setPhoneCode(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {phoneCodes.map((item) => (
                    <option key={item.code} value={item.code}>
                      {item.country} ({item.code})
                    </option>
                  ))}
                </select>
                <input
                  type="tel"
                  id="phone"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Votre numéro"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="mdp" className="block text-gray-700 font-medium">
                Mot de Passe
              </label>
              <input
                type="password"
                id="mdp"
                value={mdp}
                onChange={(e) => setMdp(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={isTermsAccepted}
                  onChange={(e) => setIsTermsAccepted(e.target.checked)}
                  required
                  className="mr-2"
                />
                J'accepte les conditions générales
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Payer
            </button>
          </form>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
            <h3 className="text-lg font-bold mb-4">Confirmation de Paiement</h3>
            <p className="text-gray-700 mb-4">Confirmez-vous le paiement de l'abonnement à ce prof?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={submitSubscribe}
                className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Oui
              </button>
              <button
                onClick={closeModal}
                className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Non
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormPayement;

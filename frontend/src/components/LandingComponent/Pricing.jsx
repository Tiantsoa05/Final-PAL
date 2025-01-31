import { Check } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Pricing() {
  const plans = [
    {
      duration:1,
      price: 5000,
      features: [
        "Leçons structurées",
        "Exercices et test d'évaluation",
        "Explications directes accessibles venant du prof"
      ],
      recommended: true
    },
    {
      duration:3,
      price: 15000,
      features: [
        "Leçons structurées",
        "Exercices et test d'évaluation",
        "Explications directes accessibles venant du prof"
      ],
      recommended: true
    },
    {
      duration:6,
      price: 30000,
      features: [
        "Leçons structurées",
        "Exercices et test d'évaluation",
        "Explications directes accessibles venant du prof"
      ],
      recommended: true
    }
  ];
  const [plan,setPlan]=useState({})
  const navigate = useNavigate()
  const handleSubmit = (plan)=>{
    localStorage.setItem('durationFollow',plan.duration)
    localStorage.setItem('priceFollow',plan.price)
    navigate('/payer')
  }
  return (
    <section id="prix" className=" bg-gray-50 -mt-2 h-screen ">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
           <span className="text-blue-600">Forfaits</span>
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div 
              key={plan.duration}  
              className={`
                bg-white p-6 rounded-lg shadow-md text-center 
                ${plan.recommended ? 'border-2 border-blue-600 transform scale-105' : ''}
              `}
            >
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                {"Abonnement "+plan.duration + " " + "semaine"}{plan.duration>1 && "s"}
              </h3>
              
              <div className="text-4xl font-bold text-blue-600 mb-6">
                {plan.price === 0 ? 'Gratuit' : `${plan.price}Ar`}
              </div>
              
              <ul className="mb-6 space-y-3">
                {plan.features.map((feature) => (
                  <li 
                    key={feature} 
                    className="flex items-center justify-left text-gray-700"
                  >
                    <Check className="text-green-500 mr-2" size={20} />
                    {feature}
                  </li>
                ))}
              </ul>
              
              <button 
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
                onClick={()=>handleSubmit(plan)}
              >
                Choisir ce plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


export default Pricing;
/* eslint-disable react/no-unescaped-entities */
import { Star, Quote } from 'lucide-react';

function Testimonials() {
  const testimonials = [
    {
      name: "Fitahiana",
      role: "Étudiante en marketing",
      language: "Anglais",
      quote: "J'ai doublé ma confiance en anglais en seulement 3 mois grâce à Infinity !",
      rating: 5,
      avatar: "/avatar-fitahiana.jpg"
    },
    {
      name: "Jhon Doe",
      role: "Ingénieur",
      language: "Espagnol",
      quote: "Les cours interactifs m'ont permis de communiquer facilement lors de mon dernier voyage.",
      rating: 5,
      avatar: "/avatar-jhon.jpg"
    },
    {
      name: "William Joban",
      role: "Professeure",
      language: "Allemand",
      quote: "Une approche d'apprentissage unique et vraiment efficace.",
      rating: 4,
      avatar: "/avatar-william.jpg"
    }
  ];

  return (
    <section id="temoignages" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
          Ce que vous <span className="text-blue-600">bénéficierez</span>.
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.name} 
              className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow"
            >
              <Quote className="text-blue-300 mb-4" />
              <p className="text-gray-700 mb-4 italic">"{testimonial.quote}"</p>
              
              <div className="flex items-center">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                  <p className="text-gray-600 text-sm">
                    {testimonial.role} - {testimonial.language}
                  </p>
                </div>
              </div>
              
              <div className="flex mt-4">
                {[...Array(testimonial.rating)].map((_, index) => (
                  <Star 
                    key={index} 
                    className="text-yellow-400 fill-current" 
                    size={20} 
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
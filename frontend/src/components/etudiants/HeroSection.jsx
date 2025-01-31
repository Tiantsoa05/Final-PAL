import { Rocket, Star, Users } from 'lucide-react';

export const HeroSection = () => {
  return (
    <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 px-4 rounded-2xl mb-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-6">
          Développez vos compétences avec nos cours en ligne
        </h1>
        <p className="text-xl mb-8 opacity-90">
          Accédez à des cours de qualité dispensés par des experts, où que vous soyez et à votre rythme.
        </p>
        <div className="flex flex-wrap gap-8 mt-12">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/20 rounded-lg">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold">1000+</div>
              <div className="text-sm opacity-90">Étudiants actifs</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/20 rounded-lg">
              <Rocket className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold">50+</div>
              <div className="text-sm opacity-90">Cours disponibles</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/20 rounded-lg">
              <Star className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold">4.8/5</div>
              <div className="text-sm opacity-90">Note moyenne</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

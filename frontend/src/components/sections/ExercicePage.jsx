/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ExerciceInterface from './ExerciceInterface';
import Navbar from '../etudiants/Navbar';
import Footer from '../etudiants/Footer';


export default function ExercicePage() {
  const { leconId } = useParams();
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        axios.get(`http://localhost:3000/courses/all/1`).then((res)=>{

          console.log(res.data)
        }).catch(console.log)
        // setExercises(response.data.data);
      } catch (err) {
        setError('Erreur lors du chargement des exercices');
      } finally {
        // setLoading(false);
      }
    };

    fetchExercises();
  }, [leconId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-20 flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-20 px-4">
          <div className="max-w-xl mx-auto bg-red-100 p-4 rounded-lg text-red-700">
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-20 px-4">
        <ExerciceInterface exercises={exercises} />
      </div>
      <Footer />
    </div>
  );
}
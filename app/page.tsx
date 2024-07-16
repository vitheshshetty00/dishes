'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Dish } from '../types';

export default function Home() {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newDish, setNewDish] = useState({ dishName: '', imageUrl: '' });

  useEffect(() => {
    fetchDishes();
  }, []);

  const fetchDishes = async () => {
    try {
      const response = await axios.get<Dish[]>('/api/dishes');
      setDishes(response.data);
    } catch (error) {
      console.error('Error fetching dishes:', error);
    }
  };

  const togglePublished = async (dishId: string) => {
    try {
      await axios.post('/api/toggle', { dishId });
      setDishes((prevDishes) =>
        prevDishes.map((dish) =>
          dish.dishId === dishId ? { ...dish, isPublished: !dish.isPublished } : dish
        )
      );
    } catch (error) {
      console.error('Error toggling published status:', error);
    }
  };

  const addDish = async () => {
    try {
      const response = await axios.post('/api/dishes', newDish);
      setDishes([...dishes, response.data]);
      setShowModal(false);
      setNewDish({ dishName: '', imageUrl: '' });
    } catch (error) {
      console.error('Error adding dish:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Dish Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {dishes.map((dish) => (
          <div key={dish.dishId} className="bg-white shadow-md rounded-lg overflow-hidden transform transition-all hover:scale-105">
            <img src={dish.imageUrl} alt={dish.dishName} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{dish.dishName}</h2>
              <p className="text-gray-600 mb-4">Published: {dish.isPublished ? 'Yes' : 'No'}</p>
              <button
                onClick={() => togglePublished(dish.dishId)}
                className={`w-full py-2 rounded-lg text-white ${
                  dish.isPublished ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
                }`}
              >
                {dish.isPublished ? 'Unpublish' : 'Publish'}
              </button>
            </div>
          </div>
        ))}
        <div
          className="bg-white shadow-md rounded-lg flex items-center justify-center cursor-pointer transform transition-all hover:scale-105"
          onClick={() => setShowModal(true)}
        >
          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
          </svg>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4 text-center">Add New Dish</h2>
            <form onSubmit={(e) => { e.preventDefault(); addDish(); }}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dishName">Dish Name</label>
                <input
                  type="text"
                  id="dishName"
                  value={newDish.dishName}
                  onChange={(e) => setNewDish({ ...newDish, dishName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="imageUrl">Image URL</label>
                <input
                  type="text"
                  id="imageUrl"
                  value={newDish.imageUrl}
                  onChange={(e) => setNewDish({ ...newDish, imageUrl: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
                >
                  Add Dish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

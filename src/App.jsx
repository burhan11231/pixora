import React, { useState, useEffect } from 'react';
import ImageGallery from './components/ImageGallery';
import SearchBar from './components/SearchBar';
import './App.css';

const API_KEY = import.meta.env.VITE_UNSPLASH_API_KEY;
const REFERRAL_LINK = import.meta.env.VITE_UNSPLASH_REFERRAL_LINK;

function App() {
  const [images, setImages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadImages();
  }, [page, searchTerm]);

  const loadImages = async () => {
    setIsLoading(true);
    let apiUrl = `https://api.unsplash.com/photos/random?client_id=${API_KEY}&count=20`;
    if (searchTerm) {
      apiUrl = `https://api.unsplash.com/search/photos?client_id=${API_KEY}&query=${searchTerm}&per_page=20&page=${page}`;
    }

    try {
      const response = await fetch(apiUrl);
      const data = searchTerm ? (await response.json()).results : await response.json();

      // Ensure data is always an array
      const imagesArray = Array.isArray(data) ? data : [data];

      setImages((prevImages) => [...prevImages, ...imagesArray]);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setImages([]); // Clear existing images
    setPage(1); // Reset page to 1 for new search
  };

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="app">
      <header className="header">
        <h1 className="app-title">Pixora</h1>
        <SearchBar onSearch={handleSearch} />
      </header>
      <ImageGallery images={images} referralLink={REFERRAL_LINK} />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <button className="load-more-button" onClick={loadMore}>
          Load More
        </button>
      )}
    </div>
  );
}

export default App;

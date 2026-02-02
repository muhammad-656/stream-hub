import React, { useState, useEffect } from 'react';
import PremiumNavbar from './components/PremiumNavbar';
import PremiumHero from './components/PremiumHero';
import PremiumVideoCard from './components/PremiumVideoCard';
import VideoGallery from './components/VideoGallery';
import VideoPlayer from './components/VideoPlayer';
import SearchBar from './components/SearchBar';
import AdvancedSearch from './components/AdvancedSearch';
import WatchHistory from './components/WatchHistory';
import LoadingSkeleton from './components/LoadingSkeleton';
import PageTransition from './components/PageTransition';
import AdvancedVideoGallery from './components/AdvancedVideoGallery';
import AdvancedLoading from './components/AdvancedLoading';
import ParticleBackground from './components/ParticleBackground';
import ScrollAnimation from './components/ScrollAnimation';
import Footer from './components/Footer';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { sampleVideos, featuredVideo } from './data/videos';

// Main App Component
function AppContent() {
  const [currentPage, setCurrentPage] = useState('home');
  const [videos, setVideos] = useState(sampleVideos);
  const [filteredVideos, setFilteredVideos] = useState(sampleVideos);
  const [myList, setMyList] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [watchHistory, setWatchHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    category: 'all',
    year: 'all',
    rating: 'all'
  });
  const { isDarkMode, toggleTheme } = useTheme();

  // Load data from localStorage on mount
  useEffect(() => {
    const savedMyList = localStorage.getItem('streamingMyList');
    const savedHistory = localStorage.getItem('watchHistory');
    
    if (savedMyList) {
      setMyList(JSON.parse(savedMyList));
    }
    if (savedHistory) {
      setWatchHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('streamingMyList', JSON.stringify(myList));
  }, [myList]);

  useEffect(() => {
    localStorage.setItem('watchHistory', JSON.stringify(watchHistory));
  }, [watchHistory]);

  // Filter videos based on search and filters
  useEffect(() => {
    let filtered = videos;

    if (searchTerm) {
      filtered = filtered.filter(video =>
        video.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filters.category !== 'all') {
      filtered = filtered.filter(video =>
        video.category === filters.category
      );
    }

    if (filters.year !== 'all') {
      filtered = filtered.filter(video => {
        if (filters.year === 'Older') return video.year < 2020;
        return video.year === filters.year;
      });
    }

    if (filters.rating !== 'all' && filters.rating !== 'Any') {
      const minRating = parseFloat(filters.rating.replace('+', ''));
      filtered = filtered.filter(video =>
        (video.rating || 0) >= minRating
      );
    }

    setFilteredVideos(filtered);
  }, [videos, searchTerm, filters]);

  const handlePlayVideo = (video) => {
    setSelectedVideo(video);
    setIsPlayerOpen(true);
    
    // Add to watch history
    setWatchHistory(prev => {
      const existing = prev.find(item => item.id === video.id);
      if (existing) {
        return prev.map(item =>
          item.id === video.id
            ? { ...item, watchedAt: Date.now(), progress: Math.min((item.progress || 0) + 10, 100) }
            : item
        );
      } else {
        return [{ ...video, watchedAt: Date.now(), progress: 10 }, ...prev].slice(0, 50);
      }
    });
  };

  const handleClosePlayer = () => {
    setIsPlayerOpen(false);
    setSelectedVideo(null);
  };

  const handleAddToMyList = (video) => {
    setMyList(prev => {
      const exists = prev.some(item => item.id === video.id);
      if (exists) {
        return prev.filter(item => item.id !== video.id);
      } else {
        return [...prev, video];
      }
    });
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilter = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearHistory = () => {
    setWatchHistory([]);
    localStorage.removeItem('watchHistory');
  };

  const categories = [...new Set(videos.map(video => video.category))];

  const renderContent = () => {
    switch (currentPage) {
      case 'trending':
        return (
          <PageTransition>
            <div className="min-h-screen bg-gray-900/90 backdrop-blur-sm">
              <div className="py-12">
                <ScrollAnimation animation="fadeUp" delay={100}>
                  <h1 className="text-5xl font-bold text-center mb-8 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                    🔥 Trending Now
                  </h1>
                </ScrollAnimation>
                <AdvancedVideoGallery
                  videos={filteredVideos.slice(0, 8)}
                  onPlayVideo={handlePlayVideo}
                  onAddToMyList={handleAddToMyList}
                  myList={myList}
                  title="Hot Picks"
                />
              </div>
            </div>
          </PageTransition>
        );
      case 'categories':
        return (
          <PageTransition>
            <div className="min-h-screen bg-gray-900">
              <div className="py-12">
                <h1 className="text-4xl font-bold text-white text-center mb-8">Browse Categories</h1>
                <AdvancedSearch 
                  onSearch={handleSearch}
                  onFilter={handleFilter}
                  categories={categories}
                />
                <VideoGallery
                  videos={filteredVideos}
                  onPlayVideo={handlePlayVideo}
                  onAddToMyList={handleAddToMyList}
                  myList={myList}
                />
              </div>
            </div>
          </PageTransition>
        );
      case 'mylist':
        return (
          <PageTransition>
            <div className="min-h-screen bg-gray-900">
              <div className="py-12">
                <h1 className="text-4xl font-bold text-white text-center mb-8">My List</h1>
                {myList.length === 0 ? (
                  <div className="text-center text-gray-400 py-20">
                    <svg className="w-24 h-24 mx-auto mb-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <p className="text-xl">Your list is empty</p>
                    <p className="mt-2">Add videos to your list to watch them later</p>
                  </div>
                ) : (
                  <VideoGallery
                    videos={myList}
                    onPlayVideo={handlePlayVideo}
                    onAddToMyList={handleAddToMyList}
                    myList={myList}
                  />
                )}
              </div>
            </div>
          </PageTransition>
        );
      case 'watchHistory':
        return (
          <PageTransition>
            <WatchHistory 
              watchHistory={watchHistory}
              onPlayVideo={handlePlayVideo}
              onClearHistory={handleClearHistory}
            />
          </PageTransition>
        );
      case 'contact':
        return (
          <PageTransition>
            <div className="min-h-screen bg-gray-900">
              <div className="py-12">
                <h1 className="text-4xl font-bold text-white text-center mb-8">Contact Us</h1>
                <div className="max-w-2xl mx-auto px-4">
                  <div className="bg-gray-800 rounded-lg p-8">
                    <form className="space-y-6">
                      <div>
                        <label className="block text-white mb-2">Name</label>
                        <input type="text" className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500" />
                      </div>
                      <div>
                        <label className="block text-white mb-2">Email</label>
                        <input type="email" className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500" />
                      </div>
                      <div>
                        <label className="block text-white mb-2">Message</label>
                        <textarea rows="4" className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"></textarea>
                      </div>
                      <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200">
                        Send Message
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </PageTransition>
        );
      default: // home
        return (
          <div className="min-h-screen bg-neutral-950">
            <PremiumHero featuredVideo={featuredVideo} onPlayVideo={handlePlayVideo} />
            <div className="bg-neutral-950">
              <ScrollAnimation animation="fadeUp" delay={200}>
                <SearchBar onSearch={handleSearch} onCategoryFilter={(category) => setFilters(prev => ({ ...prev, category }))} />
              </ScrollAnimation>
              <div className="max-w-screen-2xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
                <ScrollAnimation animation="fadeUp" delay={300}>
                  <h2 className="text-4xl font-black text-white mb-12 gradient-text">
                    Continue Watching
                  </h2>
                </ScrollAnimation>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                  {filteredVideos.map((video, index) => (
                    <ScrollAnimation 
                      key={video.id} 
                      animation="fadeUp" 
                      delay={400 + index * 100}
                      threshold={0.1}
                    >
                      <PremiumVideoCard
                        video={video}
                        onPlayVideo={handlePlayVideo}
                        onAddToMyList={handleAddToMyList}
                        myList={myList}
                        index={index}
                      />
                    </ScrollAnimation>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className={`min-h-screen relative ${isDarkMode ? 'dark' : ''}`}>
      <ParticleBackground />
      <div className="relative z-10">
        <PremiumNavbar 
          currentPage={currentPage} 
          setCurrentPage={setCurrentPage} 
          myListCount={myList.length}
          isDarkMode={isDarkMode}
          toggleTheme={toggleTheme}
        />
        {renderContent()}
        <Footer />
        <VideoPlayer
          video={selectedVideo}
          isOpen={isPlayerOpen}
          onClose={handleClosePlayer}
        />
      </div>
    </div>
  );
}

// Root App with ThemeProvider
function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;

import React, { useState } from 'react';
import axios from 'axios';

function App() {
  // State
  const [cityCount, setCityCount] = useState(2);
  const [cities, setCities] = useState(['', '']);
  const [weatherData, setWeatherData] = useState([]);

  // Handlers
  const handleCityChange = (index, value) => {
    const updated = [...cities];
    updated[index] = value;
    setCities(updated);
  };

  const handleCityCountChange = (e) => {
    const count = parseInt(e.target.value);
    if (isNaN(count) || count < 1 || count > 10) return;
    setCityCount(count);
    setCities(Array(count).fill(''));
    setWeatherData([]);
  };

  const getWeather = async () => {
    const results = [];

    for (const city of cities) {
      if (!city) continue;
      try {
        const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
          params: {
            q: city,
            units: 'metric',
            appid: 'c75c981860a96ab6063e0ae97da59e40',
          },
        });

        const tempC = response.data.main?.temp;
        const iconCode = response.data.weather[0].icon;
        const description = response.data.weather[0].description;

        results.push({
          city,
          tempC,
          tempF: ((tempC * 9) / 5 + 32).toFixed(1),
          icon: `https://openweathermap.org/img/wn/${iconCode}@2x.png`,
          description,
        });
      } catch (error) {
        results.push({ city, error: 'Not found' });
      }
    }

    setWeatherData(results);
  };

  // Utility
  const getBackgroundColor = (description) => {
    const desc = description.toLowerCase();
    if (desc.includes('clear')) return '#ffe082';
    if (desc.includes('cloud')) return '#c0c5c7ff';
    if (desc.includes('rain')) return '#b3e5fc';
    if (desc.includes('snow')) return '#e1f5fe';
    if (desc.includes('storm') || desc.includes('thunder')) return '#51626aff';
    if (desc.includes('mist') || desc.includes('fog')) return '#e0e0e0';
    return '#f0f8ff';
  };

  return (
    <div
      style={{
        backgroundImage: 'url("/clouds.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        padding: '2rem',
        fontFamily: 'Arial, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Header */}
      <div
        style={{
          backgroundColor: 'rgba(255,255,255,0.8)',
          padding: '1rem 2rem',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
          textAlign: 'center',
          marginBottom: '1rem',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        <h1 style={{ color: '#1742b0ff', margin: 0 }}>
          Compare the Live Weather Data in up to 10 Cities
        </h1>
      </div>

      {/* Main Layout */}
      <div
        style={{
          display: 'flex',
          width: '100%',
          maxWidth: '1200px',
          justifyContent: 'space-between',
          gap: '2rem',
        }}
      >
        {/* Input Panel */}
        <div style={{ flex: 0.3 }}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ marginRight: '1rem' }}>
              How many cities would you like to compare?
            </label>
            <input
              type="number"
              min="1"
              max="10"
              value={cityCount}
              onChange={handleCityCountChange}
              style={{ padding: '0.5rem', width: '60px' }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            {cities.map((city, index) => (
              <input
                key={index}
                type="text"
                placeholder={`City ${index + 1}`}
                value={city}
                onChange={(e) => handleCityChange(index, e.target.value)}
                style={{
                  padding: '0.5rem',
                  marginBottom: '0.5rem',
                  width: '100%',
                  borderRadius: '4px',
                  border: '1px solid #1742b0ff',
                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                  transition: 'box-shadow 0.3s ease',
                }}
                onMouseEnter={(e) =>
                  (e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)')
                }
                onMouseLeave={(e) =>
                  (e.target.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.1)')
                }
              />
            ))}
          </div>

          <button
            onClick={getWeather}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#1742b0ff',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              boxShadow: '0 3px 8px rgba(0, 0, 0, 0.2)',
              transition: 'box-shadow 0.3s ease, transform 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.target.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.3)';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.boxShadow = '0 3px 8px rgba(0, 0, 0, 0.2)';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            Get Weather
          </button>
        </div>

        {/* Results Panel */}
        <div style={{ flex: 0.7 }}>
          {weatherData.length > 0 && (
            <>
              <div
                style={{
                  backgroundColor: 'rgba(255,255,255,0.9)',
                  padding: '1rem 2rem',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                  textAlign: 'center',
                  marginBottom: '1rem',
                  width: '100%',
                  boxSizing: 'border-box',
                }}
              >
                <h2 style={{ color: '#1742b0ff', fontSize: '1.8rem', margin: 0 }}>Results</h2>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '1.5rem',
                  backgroundColor: 'rgba(255,255,255,0.9)',
                  padding: '1rem 2rem',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                  transition: 'box-shadow 0.3s ease',
                  width: '100%',
                  boxSizing: 'border-box',
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.3)')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)')
                }
              >
                {weatherData.map((entry, index) => {
                  const titleCaseCity = entry.city
                    .toLowerCase()
                    .split(' ')
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ');

                  return (
                    <div
                      key={index}
                      style={{
                        padding: '1rem',
                        borderRadius: '8px',
                        backgroundColor: getBackgroundColor(entry.description),
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                        textAlign: 'center',
                      }}
                    >
                      <h3>{titleCaseCity}</h3>
                      {entry.error ? (
                        <p>{entry.error}</p>
                      ) : (
                        <>
                          <img
                            src={entry.icon}
                            alt={entry.description}
                            title={entry.description}
                            style={{ width: '60px', height: '60px' }}
                          />
                          <p>{entry.tempC}°C / {entry.tempF}°F</p>
                          <p style={{ fontStyle: 'italic', color: '#555' }}>
                            {entry.description}
                          </p>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
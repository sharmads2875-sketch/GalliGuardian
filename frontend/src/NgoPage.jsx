import { useNavigate } from 'react-router-dom';
import './NgoPage.css';

function NgoPage() {
  const navigate = useNavigate();

  // Mock NGO data
  const ngos = [
    {
      id: 1,
      name: 'Paws & Care Foundation',
      phone: '+91 98765 43210',
      email: 'contact@pawscare.org',
      address: '123 Animal Welfare Street, City',
      distance: '2.3 km',
      lat: 28.6139,
      lng: 77.2090,
    },
    {
      id: 2,
      name: 'Stray Animal Rescue Network',
      phone: '+91 98765 43211',
      email: 'info@strayrescue.in',
      address: '456 Compassion Road, City',
      distance: '4.7 km',
      lat: 28.6140,
      lng: 77.2095,
    },
    {
      id: 3,
      name: 'Animal Aid Society',
      phone: '+91 98765 43212',
      email: 'help@animalaid.org',
      address: '789 Rescue Lane, City',
      distance: '6.1 km',
      lat: 28.6145,
      lng: 77.2100,
    },
    {
      id: 4,
      name: 'Helping Paws Initiative',
      phone: '+91 98765 43213',
      email: 'contact@helpingpaws.in',
      address: '321 Care Avenue, City',
      distance: '8.5 km',
      lat: 28.6150,
      lng: 77.2105,
    },
  ];

  return (
    <div className="ngo-page">
      <div className="ngo-background"></div>
      
      <div className="ngo-container">
        <header className="ngo-header">
          <button className="back-button" onClick={() => navigate('/')}>
            ← Back
          </button>
          <h1>📍 NGO Support</h1>
          <p>Find nearby animal rescue organizations</p>
        </header>

        <div className="map-container">
          <div className="mock-map">
            <div className="map-placeholder">
              <div className="map-icon">🗺️</div>
              <p>Interactive Map View</p>
              <div className="map-markers">
                {ngos.map((ngo, index) => (
                  <div
                    key={ngo.id}
                    className="map-marker"
                    style={{
                      left: `${20 + index * 25}%`,
                      top: `${30 + (index % 2) * 30}%`,
                    }}
                  >
                    <span className="marker-icon">📍</span>
                    <div className="marker-tooltip">{ngo.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="ngo-list">
          <h2>Nearby NGOs</h2>
          <div className="ngo-cards">
            {ngos.map((ngo) => (
              <div key={ngo.id} className="ngo-card">
                <div className="ngo-card-header">
                  <div className="ngo-icon">🏥</div>
                  <div>
                    <h3>{ngo.name}</h3>
                    <span className="ngo-distance">📍 {ngo.distance} away</span>
                  </div>
                </div>
                <div className="ngo-card-body">
                  <div className="ngo-info-item">
                    <span className="info-icon">📞</span>
                    <span>{ngo.phone}</span>
                  </div>
                  <div className="ngo-info-item">
                    <span className="info-icon">✉️</span>
                    <span>{ngo.email}</span>
                  </div>
                  <div className="ngo-info-item">
                    <span className="info-icon">📍</span>
                    <span>{ngo.address}</span>
                  </div>
                </div>
                <div className="ngo-card-footer">
                  <button className="call-button">Call Now</button>
                  <button className="direction-button">Get Directions</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NgoPage;

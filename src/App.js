import React, {useState} from "react";
import {
    GoogleMap,
    withScriptjs,
    withGoogleMap,
    Marker,
    InfoWindow
} from 'react-google-maps';
import * as parksData from "./data/skateboard-parks.json";
import mapStyles from "./Components/mapStyles";

function Map() {

    const [selectedPark, setSelectedPark] = useState(null);

    return (
        <GoogleMap
            defaultZoom={10}
            defaultCenter={{lat:45.421532, lng:-75.697189}}
            defaultOptions={{styles: mapStyles}}
        >
        {parksData.features.map(park =>(
                <Marker
                    key={park.properties.PARK_ID}
                    position={{
                        lat: park.geometry.coordinates[1],
                        lng: park.geometry.coordinates[0]
                    }}
                    onClick={() => {
                        setSelectedPark(park);
                    }}
                    icon={{
                        url: '/marker_icon.png',
                        scaledSize: new window.google.maps.Size(25, 25)
                    }}
                />
        ))}

            {selectedPark && (
                <InfoWindow
                    position={{
                        lat: selectedPark.geometry.coordinates[1],
                        lng: selectedPark.geometry.coordinates[0]
                    }}

                    onCloseClick={() => {
                        setSelectedPark(null);
                    }}
                >
                    <div>
                        <h2>{selectedPark.properties.NAME}</h2>
                        <p>{selectedPark.properties.DESCRIPTIO}</p>
                    </div>
                </InfoWindow>
            )}
        </GoogleMap>
    );
}

const WrapperMap = withScriptjs(withGoogleMap(Map));

export default function App() {
    return <div style={{width: "80vw", height: "80vh"}}>
        <WrapperMap googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}&language=en-US`}
        loadingElement={<div style={{ height:"100%" }} />}
        containerElement={<div style={{ height:"100%" }} />}
        mapElement={<div style={{ height:"100%" }} />}
        />
    </div>
}

/*import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;*/

// defaultCenter={{lat:41.878113, lng:-87.629799}}

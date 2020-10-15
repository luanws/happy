import React, { useEffect, useState } from "react"
import { FaWhatsapp } from "react-icons/fa"
import { FiClock, FiInfo, FiArrowLeft } from "react-icons/fi"
import { Map, Marker, TileLayer } from "react-leaflet"
import { useHistory, useParams } from 'react-router-dom'

import '../styles/pages/orphanage.css'
import Sidebar from "../components/Sidebar"
import mapIcon from "../utils/map-icon"
import api from "../services/api"

interface Params {
  id: string
}

interface Orphanage {
  name: string
  latitude: number
  longitude: number
  description: string
  instructions: string
  openingHours: string
  openOnWeekends: string
  images: Array<{
    path: string
  }>
}

export default function OrphanageDetails() {
  const { goBack } = useHistory()

  const params = useParams<Params>()

  const [orphanage, setOrphanage] = useState<Orphanage>()

  useEffect(() => {
    api.get(`orphanages/${params.id}`).then(response => {
      setOrphanage(response.data)
    })
  }, [params.id])

  if (!orphanage) return <p style={{ color: '#17D6EB' }}>Carregando...</p>

  return (
    <div id="page-orphanage">
      <Sidebar />
      <main>
        <div className="orphanage-details">
          <img src={orphanage.images[0].path} alt={orphanage.name} />

          <div className="images">
            {orphanage.images.map(image => {
              return (
                <button className="active" type="button">
                  <img src={image.path} alt={orphanage.name} />
                </button>
              )
            })}
          </div>

          <div className="orphanage-details-content">
            <h1>Lar das meninas</h1>
            <p>Presta assistência a crianças de 06 a 15 anos que se encontre em situação de risco e/ou vulnerabilidade social.</p>

            <div className="map-container">
              <Map
                center={[-27.2092052, -49.6401092]}
                zoom={16}
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />
                <Marker interactive={false} icon={mapIcon} position={[-27.2092052, -49.6401092]} />
              </Map>

              <footer>
                <a href="">Ver rotas no Google Maps</a>
              </footer>
            </div>

            <hr />

            <h2>Instruções para visita</h2>
            <p>Venha como se sentir mais à vontade e traga muito amor para dar.</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta <br />
                8h às 18h
              </div>
              <div className="open-on-weekends">
                <FiInfo size={32} color="#39CC83" />
                Atendemos <br />
                fim de semana
              </div>
            </div>

            <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
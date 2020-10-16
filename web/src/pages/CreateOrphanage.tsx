import React, { FormEvent, useState } from "react"
import { Map, Marker, TileLayer } from 'react-leaflet'
import { useHistory } from "react-router-dom"
import { FiArrowLeft, FiPlus } from "react-icons/fi"
import '../styles/pages/create-orphanage.css'
import Sidebar from "../components/Sidebar"
import mapIcon from "../utils/map-icon"
import { LeafletMouseEvent } from 'leaflet'

interface MapPosition {
  latitude: number
  longitude: number
}

export default function CreateOrphanage() {
  const { goBack } = useHistory()

  const [mapPosition, setMapPosition] = useState<MapPosition | undefined>(undefined)

  const [name, setName] = useState<string>('')
  const [about, setAbout] = useState<string>('')
  const [instructions, setInstructions] = useState<string>('')
  const [openingHours, setOpeningHours] = useState<string>('')
  const [openOnWeekends, setOpenOnWeekends] = useState<boolean>(false)

  function handleMapClick(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng
    setMapPosition({ latitude: lat, longitude: lng })
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const [latitude, longitude] = [mapPosition?.latitude, mapPosition?.longitude]

    const orphanage = {
      name,
      about,
      instructions,
      openingHours,
      openOnWeekends,
      latitude,
      longitude
    }

    console.log(orphanage)
  }

  return (
    <div id="page-create-orphanage">
      <Sidebar />
      <main>
        <form onSubmit={handleSubmit} className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <Map
              center={[-30.0262357, -52.9189279]}
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onclick={handleMapClick}
            >
              <TileLayer
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />
              {mapPosition && (
                <Marker
                  interactive={false}
                  icon={mapIcon}
                  position={[mapPosition.latitude, mapPosition.longitude]}
                />
              )}

            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input
                id="name"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea
                id="name"
                maxLength={300}
                value={about}
                onChange={e => setAbout(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                <button type="button" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </button>
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea
                id="instructions"
                value={instructions}
                onChange={e => setInstructions(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de funcionamento</label>
              <input
                id="opening_hours"
                value={openingHours}
                onChange={e => setOpeningHours(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button
                  type="button"
                  className={openOnWeekends ? 'active' : ''}
                  onClick={() => setOpenOnWeekends(true)}
                >Sim</button>
                <button
                  type="button"
                  className={openOnWeekends ? '' : 'active'}
                  onClick={() => setOpenOnWeekends(false)}
                >Não</button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  )
}
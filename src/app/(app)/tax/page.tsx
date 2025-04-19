"use client"

import { useEffect, useState } from "react"
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet"
import { scaleThreshold } from "d3-scale"

import "leaflet/dist/leaflet.css"

// Define the type for our country data
type CountryFeature = GeoJSON.Feature<
  GeoJSON.Polygon | GeoJSON.MultiPolygon,
  {
    name: string
    population?: number
  }
>

export default function CountryPopulationMap() {
  const [countries, setCountries] = useState<GeoJSON.FeatureCollection<GeoJSON.Polygon | GeoJSON.MultiPolygon>>()
  const [loading, setLoading] = useState(true)

  // Fetch country data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch GeoJSON data
        const geoResponse = await fetch(
          "https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson",
        )
        const geoData = await geoResponse.json()

        // Fetch population data (example source)
        const popResponse = await fetch("https://restcountries.com/v3.1/all?fields=name,population,cca3")
        const popData = await popResponse.json()

        // Create a map of country code to population
        const populationMap = popData.reduce((acc: Record<string, number>, country: any) => {
          acc[country.cca3] = country.population
          return acc
        }, {})

        // Add population data to GeoJSON features
        const enrichedGeoData = {
          ...geoData,
          features: geoData.features.map((feature: any) => ({
            ...feature,
            properties: {
              ...feature.properties,
              population: populationMap[feature.properties.ISO_A3] || 0,
            },
          })),
        }

        setCountries(enrichedGeoData)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Create a color scale based on population
  const colorScale = scaleThreshold<number, string>()
    .domain([100000, 1000000, 10000000, 50000000, 100000000, 500000000])
    .range([
      "#ffffcc", // Very low population
      "#ffeda0", // Low population
      "#fed976", // Medium-low population
      "#feb24c", // Medium population
      "#fd8d3c", // Medium-high population
      "#fc4e2a", // High population
      "#e31a1c", // Very high population
    ])

  // Style function for GeoJSON
  const getStyle = (feature?: CountryFeature) => {
    const population = feature?.properties?.population || 0
    return {
      fillColor: colorScale(population),
      weight: 1,
      opacity: 1,
      color: "white",
      fillOpacity: 0.7,
    }
  }

  // Format population with commas
  const formatPopulation = (population: number) => {
    return population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading map data...</div>
  }

  return (
    <div className="h-screen w-full">
      <MapContainer center={[20, 0]} zoom={2} style={{ height: "100%", width: "100%" }} minZoom={2}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {countries && (
          <GeoJSON
            data={countries}
            style={(feature) => getStyle(feature as CountryFeature)}
            onEachFeature={(feature, layer) => {
              const typedFeature = feature as CountryFeature
              const name = typedFeature.properties?.name || "Unknown"
              const population = typedFeature.properties?.population || 0

              layer.bindTooltip(
                `<div>
                  <strong>${name}</strong><br/>
                  Population: ${formatPopulation(population)}
                </div>`,
                { sticky: true },
              )
            }}
          />
        )}
      </MapContainer>

      <div className="absolute bottom-5 right-5 bg-white p-3 rounded-md shadow-md z-[1000]">
        <h3 className="text-sm font-bold mb-2">Population</h3>
        <div className="grid grid-cols-7 gap-1">
          {colorScale.range().map((color, i) => (
            <div key={i} className="flex flex-col items-center">
              <div style={{ backgroundColor: color }} className="w-5 h-5"></div>
              <span className="text-xs">
                {i === 0 ? "<100K" : i === 6 ? ">500M" : `${colorScale.domain()[i - 1] / 1000000}M`}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

"use client"

import { useEffect, useState } from "react"
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from "@react-google-maps/api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { supabase } from "@/lib/supabase"

const containerStyle = {
  width: "100%",
  height: "calc(100vh - 200px)",
}

export default function LaundromatsMapPage() {
  const [laundromats, setLaundromats] = useState<any[]>([])
  const [selected, setSelected] = useState<any | null>(null)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  })

  useEffect(() => {
    async function fetchLaundromats() {
      const { data, error } = await supabase.from("participating_laundromats").select("*")
      if (error) {
        console.error("Error fetching laundromats from Supabase:", error)
        setLaundromats([])
      } else {
        setLaundromats(data || [])
      }
    }
    fetchLaundromats()
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => setUserLocation(null)
      )
    }
  }, [])

  if (!isLoaded) return <div>Loading map...</div>

  // Default center: NYC
  const center = userLocation || { lat: 40.7128, lng: -74.006 }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl">Laundromats Map</CardTitle>
        </CardHeader>
        <CardContent className="p-0 md:p-6">
          <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
            {userLocation && (
              <Marker
                position={userLocation}
                icon={{ url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png" }}
                title="Your Location"
              />
            )}
            {laundromats.map((laundromat, idx) => {
              const lat = typeof laundromat.latitude === "string" ? parseFloat(laundromat.latitude) : laundromat.latitude
              const lng = typeof laundromat.longitude === "string" ? parseFloat(laundromat.longitude) : laundromat.longitude
              if (isNaN(lat) || isNaN(lng)) return null
              return (
                <Marker
                  key={laundromat.laundromat_id || idx}
                  position={{ lat, lng }}
                  onClick={() => setSelected(laundromat)}
                  title={laundromat.name}
                />
              )
            })}
            {selected && (
              <InfoWindow
                position={{ lat: typeof selected.latitude === "string" ? parseFloat(selected.latitude) : selected.latitude, lng: typeof selected.longitude === "string" ? parseFloat(selected.longitude) : selected.longitude }}
                onCloseClick={() => setSelected(null)}
              >
                <div className="max-w-[280px] md:max-w-[300px] p-2">
                  <strong className="text-base md:text-lg block">{selected.name}</strong>
                  {selected.photo_reference && (
                    <img
                      src={selected.photo_reference}
                      alt={selected.name}
                      className="w-full my-2 rounded-lg max-h-32 md:max-h-40 object-cover"
                    />
                  )}
                  <div className="text-sm mb-1">{selected.address}</div>
                  {selected.rating && (
                    <div className="mb-1">
                      <span className="text-yellow-500 font-bold">{selected.rating} ★</span>
                      {selected.total_user_ratings && (
                        <span className="text-gray-500 ml-1">({selected.total_user_ratings} reviews)</span>
                      )}
                    </div>
                  )}
                  {selected.phone && (
                    <div className="text-sm">
                      <a href={`tel:${selected.phone}`} className="text-blue-600 hover:underline">{selected.phone}</a>
                    </div>
                  )}
                  {selected.hours_of_operation && (
                    <div className="text-sm">
                      <strong>Hours:</strong> {selected.hours_of_operation}
                    </div>
                  )}
                  {selected.borough && <div className="text-sm">Borough: {selected.borough}</div>}
                  {selected.accessible !== undefined && (
                    <div className="text-sm">Accessible: {selected.accessible ? "Yes" : "No"}</div>
                  )}
                  {selected.top_review_text && (
                    <div className="mt-2 text-sm italic">
                      "{selected.top_review_text}"
                      {selected.top_review_author && (
                        <div className="font-bold text-xs mt-1">- {selected.top_review_author}</div>
                      )}
                      {selected.top_review_rating && (
                        <div className="text-yellow-500 text-xs">{selected.top_review_rating} ★</div>
                      )}
                    </div>
                  )}
                  {selected.google_maps_url && (
                    <div className="mt-2">
                      <a
                        href={selected.google_maps_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-sm"
                      >
                        Directions
                      </a>
                    </div>
                  )}
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </CardContent>
      </Card>
    </div>
  )
} 
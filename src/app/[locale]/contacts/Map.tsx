"use client";
import React, { useState } from "react";
import {
    GoogleMap,
    Marker,
    OverlayView,
    useLoadScript,
} from "@react-google-maps/api";
import MapButton from "./ui/MapButton";
import { useTranslations } from "next-intl";

const mapContainerStyle: React.CSSProperties = {
    width: "95%",
    height: "70vh",
    borderRadius: "32px",
    margin: "3vh auto",
};

// Координаты для Бишкека
const centerBishkek: { lat: number; lng: number } = {
    lat: 42.846191,
    lng: 74.6182,
};

// Координаты для Ташкента
const centerTashkent: { lat: number; lng: number } = {
    lat: 41.310758,
    lng: 69.310728,
};

// Координаты для окна адреса в Бишкеке
const infoWindowBishkek: { lat: number; lng: number } = {
    lat: 42.847085,
    lng: 74.618839,
};

// Координаты для окна адреса в Ташкенте
const infoWindowTashkent: { lat: number; lng: number } = {
    lat: 41.311576,
    lng: 69.311335,
};

//стилизация карты
const mapOptions: google.maps.MapOptions = {
    styles: [
    // {
    //     featureType: "all",
    //     elementType: "geometry",
    //     stylers: [{ saturation: -100 }, { lightness: -10 }],
    // },
    // {
    //     featureType: "all",
    //     elementType: "labels.text.fill",
    //     stylers: [{ color: "#313336" }],
    // },
        {
            featureType: "all",
            elementType: "labels.text.stroke",
            stylers: [{ visibility: "on" }],
        },
        {
            featureType: "administrative",
            elementType: "geometry",
            stylers: [{ visibility: "on" }],
        },
    // {
    //     featureType: "landscape",
    //     elementType: "geometry",
    //     stylers: [{ color: "#131313" }],
    // },
    // {
    //     featureType: "road",
    //     elementType: "geometry",
    //     stylers: [{ color: "#64686E" }],
    // },
    // {
    //     featureType: "water",
    //     elementType: "geometry",
    //     stylers: [{ color: "#64686E" }],
    // },
    // {
    //     featureType: "poi",
    //     elementType: "geometry",
    //     stylers: [{ color: "#52555A" }],
    // },
    // {
    //     featureType: "poi",
    //     elementType: "labels.text.fill",
    //     stylers: [{ color: "#313336" }],
    // },
    // {
    //     featureType: "transit",
    //     elementType: "geometry",
    //     stylers: [{ color: "#64686E" }],
    // },
    // {
    //     featureType: "poi",
    //     elementType: "labels.icon", // Для изменения иконок меток
    //     stylers: [{ color: "#434343" }],
    // },
    // {
    //     featureType: "poi.business",
    //     elementType: "geometry",
    //     stylers: [{ visibility: "on" }, { color: "#1e1e1e" }],
    // },
    ],
    mapTypeControl: false,
    fullscreenControl: false,
    streetViewControl: false,
    zoomControl: false,
    backgroundColor: "#000000",
};

export const Map: React.FC = () => {
    const [mapCondition, setMapCondition] = useState<boolean>(true);
    const center: { lat: number; lng: number } = mapCondition
        ? centerBishkek
        : centerTashkent;

    const centerInfoWindow: { lat: number; lng: number } = mapCondition
        ? infoWindowBishkek
        : infoWindowTashkent;

    const { isLoaded, loadError }: { isLoaded: boolean; loadError?: Error } =
    useLoadScript({
        googleMapsApiKey: "AIzaSyCtrTvA1wlB3E3bjqGqPKte_pSN6aVaIoE" as string,
    });

    const t = useTranslations("Map");

    if (loadError)
        return (
            <p className="flex justify-center items-center">Ошибка загрузки карты</p>
        );
    if (!isLoaded)
        return <p className="flex justify-center items-center">Загрузка карты</p>;

    return (
        <div className="relative w-full flex flex-col items-start justify-center bg-background-dark ">
            <div className="absolute z-40 top-10 left-7 lg:top-14 lg:left-14 bg-transparent space-x-1.5">
                <MapButton
                    text={t("btn1")}
                    isActive={mapCondition}
                    onClick={() => setMapCondition(true)}
                />
                <MapButton
                    text={t("btn2")}
                    isActive={!mapCondition}
                    onClick={() => setMapCondition(false)}
                />
            </div>
            {loadError && <p className="text-red-500">Ошибка загрузки карты</p>}
            {!isLoaded ? (
                <p>Загрузка карты</p>
            ) : (
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    zoom={16}
                    center={center}
                    options={mapOptions}
                >
                    <OverlayView
                        position={center}
                        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                        getPixelPositionOffset={(
                            offsetWidth: number,
                            offsetHeight: number
                        ) => ({
                            x: -offsetWidth / 2 + 100, // Смещение вправо
                            y: -offsetHeight - 100, // Смещение выше маркера
                        })}
                    >
                        <div
                            style={{
                                backgroundColor: "white",
                                padding: "8px 12px",
                                borderRadius: "8px",
                                boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
                                minWidth: "160px",
                                textAlign: "center",
                                fontSize: "14px",
                                lineHeight: "1.4",
                                fontWeight: 700,
                                transform: "translateX(-50%)",
                            }}
                        >
                            <Marker
                                position={center}
                                icon={{
                                    url: "/map/mapMarker.svg",
                                    scaledSize: new window.google.maps.Size(50, 50), //место для кастомной иконки
                                }}
                            />
                            {mapCondition ? (
                                <p style={{ fontWeight: "700", textAlign: "start" }}>
                                    {t("adress1")}
                                </p>
                            ) : (
                                <p style={{ fontWeight: "700", textAlign: "start" }}>
                                    {t("adress2")}
                                </p>
                            )}
                        </div>
                    </OverlayView>
                </GoogleMap>
            )}
        </div>
    );
};

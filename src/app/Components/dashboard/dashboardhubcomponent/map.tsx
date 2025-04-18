"use client";
import { useState, useRef } from "react";
// @ts-ignore
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

type CountryData = {
  [key: string]: string;
};

type GeographyProps = {
  rsmKey: string;
  properties: {
    name: string;
  };
   
  geometry: unknown;
};

const populationData: CountryData = {
  "United States of America": "331,002,651",
  China: "1,439,323,776",
  India: "1,380,004,385",
  Brazil: "212,559,417",
  "United States": "331,002,651",
  Japan: "126,476,461",
  Germany: "83,783,942",
  "United Kingdom": "67,886,011",
  France: "65,273,511",
  Italy: "60,461,826",
  Canada: "38,005,238",
  // Removed duplicate entry for "Australia"
  Mexico: "128,932,753",
  "South Korea": "51,269,185",
  Spain: "47,351,567",
  Russia: "146,171,015",
  Indonesia: "273,523,615",
  Pakistan: "220,892,340",
  Nigeria: "206,139,589",
  Bangladesh: "169,300,000",
  Egypt: "102,334,404",
  Turkey: "84,339,067",
  Iran: "85,028,759",
  Thailand: "69,799,978",
  Vietnam: "97,338,579",
  Philippines: "109,581,078",
  Ethiopia: "114,963,588",
  "South Africa": "59,308,690",
  Colombia: "50,882,891",
  Argentina: "45,376,763",
  "Saudi Arabia": "34,813,871",
  Ukraine: "43,733,762",
  Poland: "37,950,802",
  Sudan: "43,849,269",
  Iraq: "40,222,493",
  Morocco: "36,910,560",
  Peru: "32,971,854",
  Malaysia: "32,365,998",
  Uzbekistan: "33,469,203",
  Venezuela: "28,435,940",
  Afghanistan: "38,928,346",
  Ghana: "31,072,940",
  Yemen: "29,825,964",
  Nepal: "29,136,808",
  Mozambique: "31,255,435",
  Syria: "17,500,658",
  "North Korea": "25,778,816",
  Taiwan: "23,816,775",
  Australia: "25,788,215",
  Madagascar: "27,691,018",
  Romania: "19,237,691",
  "Sri Lanka": "21,413,249",
  "Burkina Faso": "20,903,273",
  "Congo (Kinshasa)": "89,561,403",
  Kenya: "53,771,296",
  Algeria: "43,851,044",
  Chile: "19,116,209",
  Kazakhstan: "18,776,707",
  Zambia: "18,383,955",
  Guatemala: "16,858,333",
  Ecuador: "17,643,054",
  Cambodia: "16,718,965",
  Senegal: "16,743,927",
  Angola: "32,866,272",
  Somalia: "15,893,222",
  Haiti: "11,402,528",
  Tunisia: "11,818,619",
  Bolivia: "11,673,021",
  Belgium: "11,589,623",
  Cuba: "11,326,616",
  "Dominican Republic": "10,847,910",
  "Czech Republic": "10,708,981",
  Greece: "10,423,054",
  Jordan: "10,203,134",
  Sweden: "10,353,442",
  Azerbaijan: "10,139,177",
  Hungary: "9,772,756",
  Belarus: "9,449,323",
  "United Arab Emirates": "9,890,402",
  Honduras: "9,904,607",
  Israel: "9,216,900",
  Paraguay: "7,132,538",
  Bulgaria: "6,948,445",
  Laos: "7,275,560",
  Serbia: "6,908,224",
  "El Salvador": "6,486,205",
  Nicaragua: "6,624,554",
  Kyrgyzstan: "6,524,195",
  Denmark: "5,831,404",
  Slovakia: "5,459,642",
  Finland: "5,540,720",
  Turkmenistan: "6,031,200",
  Norway: "5,379,475",
  "Costa Rica": "5,094,118",
  "New Zealand": "5,084,300",
  Georgia: "3,989,167", // Removed duplicate entry
  Ireland: "4,937,786",
  Liberia: "5,057,681",
  Panama: "4,314,767",
  Mauritania: "4,649,658",
  Uruguay: "3,473,730",
  Mongolia: "3,310,914",
  Armenia: "2,963,243",
  Jamaica: "2,961,167",
  Qatar: "2,881,053",
  Albania: "2,877,797",
  "Puerto Rico": "2,860,853",
  "Bosnia and Herzegovina": "3,280,819",
  Moldova: "2,681,735",
  Oman: "5,106,626",
  Kuwait: "4,270,571",
  Croatia: "4,105,267",
  Estonia: "1,326,535",
  "Timor-Leste": "1,318,445",
  Fiji: "928,994",
  Bhutan: "771,608",
  "Solomon Islands": "686,884",
  Vanuatu: "307,145",
};

type Position = {
  coordinates: [number, number];
  zoom: number;
};

export default function WorldMap() {
  const [tooltip, setTooltip] = useState<{
    content: string;
    x: number;
    y: number;
  } | null>(null);
  const [position, setPosition] = useState<Position>({
    coordinates: [0, 0],
    zoom: 1,
  });
  // const mapRef = useRef<SVGSVGElement>(null);
  const mapRef = useRef<HTMLDivElement>(null); // Change from SVGSVGElement to HTMLDivElement
  const normalizeCountryName = (name: string): string => {
    return name
      .replace(/[^a-zA-Z\s]/g, "")
      .trim()
      .toLowerCase();
  };

  const getFillColor = (population: string): string => {
    const popNumber = parseInt(population.replace(/,/g, ""), 10);
    if (isNaN(popNumber)) return "#ccc";
    if (popNumber > 1_000_000_000) return "#8B0000";
    if (popNumber > 500_000_000) return "#FF4500";
    if (popNumber > 100_000_000) return "#FFA500";
    if (popNumber > 50_000_000) return "#FFD700";
    if (popNumber > 10_000_000) return "#ADFF2F";
    return "#90EE90";
  };

  const handleZoomIn = () => {
    setPosition((prev) => ({ ...prev, zoom: Math.min(prev.zoom * 1.5, 8) }));
  };

  const handleZoomOut = () => {
    setPosition((prev) => ({ ...prev, zoom: Math.max(prev.zoom / 1.5, 0.1) }));
  };

  const handleReset = () => {
    setPosition({ coordinates: [0, 0], zoom: 1 });
  };

  return (
    <div className="relative w-full rounded-lg">
      {/* Zoom Controls */}
      <div className="absolute top-4 right-4 z-10 flex flex-col space-y-2 ">
        <button
          onClick={handleZoomIn}
          className="p-2 bg-white rounded-md shadow-md hover:bg-gray-100 transition-colors"
        >
          <PlusIcon />
        </button>
        <button
          onClick={handleZoomOut}
          className="p-2 bg-white rounded-md shadow-md hover:bg-gray-100 transition-colors"
        >
          <MinusIcon />
        </button>
        <button
          onClick={handleReset}
          className="p-2 bg-white rounded-md shadow-md hover:bg-gray-100 transition-colors"
        >
          <ResetIcon />
        </button>
      </div>

      {/* Map Container */}
      <div className="overflow-hidden h-[293px] ">
        { }
        <div ref={mapRef}>
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{ scale: 150, center: [0, 20] }}
          >
            <ZoomableGroup
              center={position.coordinates}
              zoom={position.zoom}
              onMoveEnd={({
                coordinates,
                zoom,
              }: {
                coordinates: [number, number];
                zoom: number;
              }) => setPosition({ coordinates, zoom })}
            >
              <Geographies geography={geoUrl}>
                {({ geographies }: { geographies: GeographyProps[] }) =>
                  geographies
                    .filter((geo) => geo.properties.name !== "Antarctica") // Exclude Antarctica
                    .map((geo) => {
                      const countryName = geo.properties.name;
                      const normalizedCountryName =
                        normalizeCountryName(countryName);
                      const population =
                        populationData[
                          Object.keys(populationData).find(
                            (key) =>
                              normalizeCountryName(key) ===
                              normalizedCountryName
                          ) || ""
                        ] || "Data not available";

                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          onMouseEnter={(
                            event: React.MouseEvent<SVGPathElement>
                          ) => {
                            const rect =
                              mapRef.current?.getBoundingClientRect();
                            if (rect) {
                              const x = event.clientX - rect.left;
                              const y = event.clientY - rect.top;

                              setTooltip({
                                content: `${countryName}: ${population}`,
                                x,
                                y,
                              });
                            }
                          }}
                          onMouseLeave={() => setTooltip(null)}
                          style={{
                            default: {
                              fill: getFillColor(population),
                              stroke: "#475569",
                              strokeWidth: 0.5,
                            },
                            hover: {
                              fill: "#3b82f6",
                              stroke: "#1d4ed8",
                              strokeWidth: 0.5,
                            },
                            pressed: {
                              fill: "#1e40af",
                              stroke: "#1e3a8a",
                              strokeWidth: 0.5,
                            },
                          }}
                        />
                      );
                    })
                }
              </Geographies>
            </ZoomableGroup>
          </ComposableMap>
        </div>
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="absolute px-3 py-2 bg-white rounded-md shadow-lg text-sm font-medium text-gray-900 pointer-events-none"
          style={{ left: `${tooltip.x + 10}px`, top: `${tooltip.y - 20}px` }}
        >
          {tooltip.content}
        </div>
      )}

      {/* Legend */}
      <div className="w-full overflow-x-auto flex justify-center items-center mt-4">
        <div className="flex space-x-4 min-w-max">
          <div className="flex flex-col items-center">
            <div className="w-6 h-6 bg-[#8B0000] rounded-full"></div>
            <span className="text-xs">1B</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-6 h-6 bg-[#FF4500] rounded-full"></div>
            <span className="text-xs">500M–1B</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-6 h-6 bg-[#FFA500] rounded-full"></div>
            <span className="text-xs">100M–500M</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-6 h-6 bg-[#FFD700] rounded-full"></div>
            <span className="text-xs">50M–100M</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-6 h-6 bg-[#ADFF2F] rounded-full"></div>
            <span className="text-xs">10M–50M</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-6 h-6 bg-[#90EE90] rounded-full"></div>
            <span className="text-xs">10M</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// SVG Icons (unchanged)
function PlusIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function MinusIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function ResetIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
        clipRule="evenodd"
      />
    </svg>
  );
}

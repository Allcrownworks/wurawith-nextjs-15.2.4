
"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Home, ZoomIn, ZoomOut, Printer, Menu, SearchIcon } from "lucide-react"
import Chart from "chart.js/auto"
import zoomPlugin from "chartjs-plugin-zoom"
import { Chart as ChartJS, registerables } from "chart.js"

// Register Chart.js components
ChartJS.register(...registerables, zoomPlugin)

export default function DataChart() {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)
  const [showSearch, setShowSearch] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [showMenu, setShowMenu] = useState(false)
  const [searchResults, setSearchResults] = useState<number[]>([])

  // Original data for the chart
  const labels = ["Jan 03", "Jan 06", "Jan 09", "Jan 12", "Jan 15", "Jan 18", "Jan 21", "Jan 27"]
  const orderData = [1.4, 2.0, 2.5, 1.5, 2.4, 2.7, 3.8, 4.5]
  const paymentData = [1.0, 3.0, 3.5, 4.0, 4.2, 4.8, 6.5, 8.2]

  const initializeChart = () => {
    if (!chartRef.current) return

    // Destroy existing chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const ctx = chartRef.current.getContext("2d")
    if (!ctx) return

    // Create the chart
    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Number of orders",
            data: orderData,
            backgroundColor: "rgba(127, 224, 237, 0.6)",
            borderColor: "rgba(127, 224, 237, 1)",
            borderWidth: 1,
            borderRadius: 2,
            order: 1,
          },
          {
            label: "Payments",
            data: paymentData,
            type: "line",
            borderColor: "rgba(0, 123, 255, 1)",
            backgroundColor: "rgba(0, 123, 255, 0.2)", // More opacity for area fill
            borderWidth: 2,
            pointRadius: 3,
            pointBackgroundColor: "rgba(0, 123, 255, 1)",
            yAxisID: "y1",
            tension: 0.4,
            fill: true, // Enable area fill
            order: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            beginAtZero: true,
            max: 5.0,
            position: "left",
            title: {
              display: true,
              color: "#36A2EB",
              font: {
                size: 12,
              },
            },
            ticks: {
              color: "#36A2EB",
              callback: (value) => (typeof value === "number" ? value.toFixed(1) : value),
            },
            grid: {
              color: "rgba(0, 0, 0, 0.05)",
            },
          },
          y1: {
            beginAtZero: true,
            max: 10.0,
            position: "right",
            title: {
              display: true,
              color: "#36A2EB",
              font: {
                size: 12,
              },
            },
            ticks: {
              color: "#36A2EB",
              callback: (value) => (typeof value === "number" ? value.toFixed(1) : value),
            },
            grid: {
              display: false,
            },
          },
        },
        plugins: {
          legend: {
            display: true,
            position: "bottom",
            labels: {
              usePointStyle: true,
              boxWidth: 8,
            },
          },
          tooltip: {
            mode: "index",
            intersect: false,
          },
          zoom: {
            pan: {
              enabled: true,
              mode: "xy",
            },
            zoom: {
              wheel: {
                enabled: true, // Enable mouse wheel zooming
              },
              pinch: {
                enabled: true,
              },
              mode: "xy",
              scaleMode: "xy",
            },
            limits: {
              y: { min: 0, max: 5, minRange: 1 },
              y1: { min: 0, max: 10, minRange: 2 },
            },
          },
        },
      },
    })
  }

  useEffect(() => {
    initializeChart()

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [])

  // Function to handle zoom in
  const handleZoomIn = () => {
    if (!chartInstance.current) return

    const chart = chartInstance.current

    // Get the current min/max values for each axis
    const xAxis = chart.scales.x
    const yAxis = chart.scales.y
    const y1Axis = chart.scales.y1

    // Calculate new ranges (zoom in by 10%)
    const xRange = xAxis.max - xAxis.min
    const yRange = yAxis.max - yAxis.min
    const y1Range = y1Axis.max - y1Axis.min

    const newXMin = xAxis.min + xRange * 0.1
    const newXMax = xAxis.max - xRange * 0.1
    const newYMin = yAxis.min + yRange * 0.1
    const newYMax = yAxis.max - yRange * 0.1
    const newY1Min = y1Axis.min + y1Range * 0.1
    const newY1Max = y1Axis.max - y1Range * 0.1

    // Apply the zoom
    chart.zoomScale("x", { min: newXMin, max: newXMax }, "default")
    chart.zoomScale("y", { min: newYMin, max: newYMax }, "default")
    chart.zoomScale("y1", { min: newY1Min, max: newY1Max }, "default")

    chart.update()
  }

  // Function to handle zoom out
  const handleZoomOut = () => {
    if (!chartInstance.current) return

    const chart = chartInstance.current

    // Get the current min/max values for each axis
    const xAxis = chart.scales.x
    const yAxis = chart.scales.y
    const y1Axis = chart.scales.y1

    // Calculate new ranges (zoom out by 10%)
    const xRange = xAxis.max - xAxis.min
    const yRange = yAxis.max - yAxis.min
    const y1Range = y1Axis.max - y1Axis.min

    const newXMin = Math.max(0, xAxis.min - xRange * 0.1)
    const newXMax = Math.min(labels.length - 1, xAxis.max + xRange * 0.1)
    const newYMin = Math.max(0, yAxis.min - yRange * 0.1)
    const newYMax = Math.min(5.0, yAxis.max + yRange * 0.1)
    const newY1Min = Math.max(0, y1Axis.min - y1Range * 0.1)
    const newY1Max = Math.min(10.0, y1Axis.max + y1Range * 0.1)

    // Apply the zoom
    chart.zoomScale("x", { min: newXMin, max: newXMax }, "default")
    chart.zoomScale("y", { min: newYMin, max: newYMax }, "default")
    chart.zoomScale("y1", { min: newY1Min, max: newY1Max }, "default")

    chart.update()
  }

  // Function to handle search
  const handleSearch = () => {
    setShowSearch(!showSearch)
    if (!showSearch) {
      setSearchTerm("")
      setSearchResults([])
    } else {
      // If closing search, reset highlights
      resetHighlights()
    }
  }

  // Function to reset highlights
  const resetHighlights = () => {
    if (!chartInstance.current) return

    const chart = chartInstance.current
    const meta0 = chart.getDatasetMeta(0)
    const meta1 = chart.getDatasetMeta(1)

    // Reset all elements
    meta0.data.forEach((element) => {
      element.options.backgroundColor = "rgba(127, 224, 237, 0.6)"
    })

    meta1.data.forEach((element) => {
      element.options.borderColor = "rgba(0, 123, 255, 1)"
      element.options.backgroundColor = "rgba(0, 123, 255, 0.2)"
    })

    chart.update()
  }

  // Function to apply search
  const applySearch = () => {
    if (!chartInstance.current || !searchTerm) return

    // Reset previous highlights
    resetHighlights()

    const chart = chartInstance.current

    // Find all matching indices
    const matchingIndices = labels
      .map((label, index) => (label.toLowerCase().includes(searchTerm.toLowerCase()) ? index : -1))
      .filter((index) => index !== -1)

    setSearchResults(matchingIndices)

    if (matchingIndices.length > 0) {
      const meta0 = chart.getDatasetMeta(0)
      const meta1 = chart.getDatasetMeta(1)

      // Highlight all matching elements
      matchingIndices.forEach((index) => {
        if (meta0.data[index]) {
          meta0.data[index].options.backgroundColor = "rgba(255, 99, 132, 0.8)"
        }

        if (meta1.data[index]) {
          meta1.data[index].options.borderColor = "rgba(255, 99, 132, 1)"
          meta1.data[index].options.backgroundColor = "rgba(255, 99, 132, 0.3)"
        }
      })

      chart.update()

      // Focus on the first result by zooming to it
      if (matchingIndices.length === 1) {
        const index = matchingIndices[0]
        // Zoom to focus on the found data point
        chart.zoomScale("x", { min: Math.max(0, index - 1), max: Math.min(labels.length - 1, index + 1) }, "default")
        chart.update()
      }
    }
  }

  // Function to handle search input keydown
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      applySearch()
    }
  }

  // Function to handle print
  const handlePrint = () => {
    if (!chartInstance.current) return

    const canvas = chartInstance.current.canvas
    const dataUrl = canvas.toDataURL("image/png")

    const printWindow = window.open("", "_blank")
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Chart Print</title>
            <style>
              body { margin: 0; display: flex; justify-content: center; align-items: center; height: 100vh; }
              img { max-width: 100%; max-height: 100%; }
              @media print {
                body { margin: 0; padding: 0; }
              }
            </style>
          </head>
          <body>
            <img src="${dataUrl}" />
            <script>
              setTimeout(() => {
                window.print();
                window.close();
              }, 500);
            </script>
          </body>
        </html>
      `)
      printWindow.document.close()
    }
  }

  // Function to handle home (reset)
  const handleHome = () => {
    if (!chartInstance.current) return

    // Reset zoom using the plugin's resetZoom method
    chartInstance.current.resetZoom()

    // Reset data highlights
    resetHighlights()

    // Reset search
    setShowSearch(false)
    setSearchTerm("")
    setSearchResults([])
    setShowMenu(false)
  }

  // Function to toggle menu
  const handleMenu = () => {
    setShowMenu(!showMenu)
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-white p-4 rounded-lg shadow-sm">
      <div className="flex justify-end gap-2 mb-4 relative">
        <button className="p-1.5 rounded-full hover:bg-gray-100" onClick={handleZoomIn} title="Zoom In">
          <ZoomIn className="w-4 h-4 text-gray-500" />
        </button>
        <button className="p-1.5 rounded-full hover:bg-gray-100" onClick={handleZoomOut} title="Zoom Out">
          <ZoomOut className="w-4 h-4 text-gray-500" />
        </button>
        <button
          className={`p-1.5 rounded-full hover:bg-gray-100 ${showSearch ? "bg-gray-200" : ""}`}
          onClick={handleSearch}
          title="Search"
        >
          {/* Explicitly using SearchIcon (magnifier) with increased size for visibility */}
          <SearchIcon className="w-5 h-5 text-gray-600" strokeWidth={2} />
        </button>
        <button className="p-1.5 rounded-full hover:bg-gray-100" onClick={handlePrint} title="Print">
          <Printer className="w-4 h-4 text-gray-500" />
        </button>
        <button className="p-1.5 rounded-full hover:bg-gray-100" onClick={handleHome} title="Reset">
          <Home className="w-4 h-4 text-gray-500" />
        </button>
        <button
          className={`p-1.5 rounded-full hover:bg-gray-100 ${showMenu ? "bg-gray-200" : ""}`}
          onClick={handleMenu}
          title="Menu"
        >
          <Menu className="w-4 h-4 text-gray-500" />
        </button>

        {/* Search input */}
        {showSearch && (
          <div className="absolute right-0 top-10 bg-white shadow-md rounded-md p-2 z-10 flex">
            <div className="relative flex items-center">
              <SearchIcon className="w-4 h-4 text-gray-400 absolute left-2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                placeholder="Search date (e.g. Jan 15)"
                className="border rounded pl-8 pr-2 py-1 text-sm w-48"
                autoFocus
              />
            </div>
            <button
              onClick={applySearch}
              className="ml-2 bg-blue-500 text-white px-2 py-1 rounded text-sm flex items-center"
            >
              <SearchIcon className="w-3 h-3 mr-1" />
              Search
            </button>
          </div>
        )}

        {/* Search results indicator */}
        {searchResults.length > 0 && (
          <div className="absolute right-0 top-[4.5rem] bg-white shadow-md rounded-md p-2 z-10">
            <p className="text-xs text-gray-600">
              Found {searchResults.length} result{searchResults.length !== 1 ? "s" : ""}
            </p>
          </div>
        )}

        {/* Menu dropdown */}
        {showMenu && (
          <div className="absolute right-0 top-10 bg-white shadow-md rounded-md p-2 z-10 w-40">
            <ul className="text-sm">
              <li className="p-1.5 hover:bg-gray-100 cursor-pointer rounded">Download PNG</li>
              <li className="p-1.5 hover:bg-gray-100 cursor-pointer rounded">Download CSV</li>
              <li className="p-1.5 hover:bg-gray-100 cursor-pointer rounded">View Full Screen</li>
              <li className="p-1.5 hover:bg-gray-100 cursor-pointer rounded">Share Chart</li>
            </ul>
          </div>
        )}
      </div>
      <div className="h-[300px] relative">
        <canvas ref={chartRef}></canvas>
      </div>
    
    </div>
  )
}


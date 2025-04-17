"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { Home, ZoomIn, ZoomOut, SearchIcon, Printer, Menu, Share2, Download, Maximize2, FileText } from "lucide-react"
import { Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart, Legend } from "recharts"

export default function DataChart() {
  // Original data for the chart
  const [data, setData] = useState([
    { name: "Jan 03", orders: 1.4, payments: 1.0, highlighted: false },
    { name: "Jan 06", orders: 2.0, payments: 3.0, highlighted: false },
    { name: "Jan 09", orders: 2.5, payments: 3.5, highlighted: false },
    { name: "Jan 12", orders: 1.5, payments: 4.0, highlighted: false },
    { name: "Jan 15", orders: 2.4, payments: 4.2, highlighted: false },
    { name: "Jan 18", orders: 2.7, payments: 4.8, highlighted: false },
    { name: "Jan 21", orders: 3.8, payments: 6.5, highlighted: false },
    { name: "Jan 27", orders: 4.5, payments: 8.2, highlighted: false },
  ])

  const [showSearch, setShowSearch] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [showMenu, setShowMenu] = useState(false)
  const [searchResults, setSearchResults] = useState<number[]>([])
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [showShareTooltip, setShowShareTooltip] = useState(false)

  // Zoom state
  const [zoomDomain, setZoomDomain] = useState<{
    x: [number, number]
    y1: [number, number]
    y2: [number, number]
  }>({
    x: [0, data.length - 1],
    y1: [0, 5],
    y2: [0, 10],
  })

  // Panning state
  const [isPanning, setIsPanning] = useState(false)
  const [startPanPosition, setStartPanPosition] = useState({ x: 0, y: 0 })
  const [startDomain, setStartDomain] = useState(zoomDomain)

  const chartRef = useRef<HTMLDivElement>(null)
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const fullScreenContainerRef = useRef<HTMLDivElement>(null)

  // Add mouse wheel zoom functionality
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!chartContainerRef.current) return

      // Prevent default scrolling behavior
      e.preventDefault()

      // Get the current zoom domain
      const currentXRange = zoomDomain.x[1] - zoomDomain.x[0]
      const currentY1Range = zoomDomain.y1[1] - zoomDomain.y1[0]
      const currentY2Range = zoomDomain.y2[1] - zoomDomain.y2[0]

      // Calculate zoom factor based on wheel delta
      // Negative delta means zoom in, positive means zoom out
      const zoomFactor = e.deltaY > 0 ? 0.1 : -0.1

      // Get mouse position relative to chart container
      const rect = chartContainerRef.current.getBoundingClientRect()
      const mouseX = (e.clientX - rect.left) / rect.width

      // Calculate new domain values
      let newXMin, newXMax, newY1Min, newY1Max, newY2Min, newY2Max

      if (zoomFactor < 0) {
        // Zoom in
        newXMin = zoomDomain.x[0] + currentXRange * Math.abs(zoomFactor) * mouseX
        newXMax = zoomDomain.x[1] - currentXRange * Math.abs(zoomFactor) * (1 - mouseX)
        newY1Min = zoomDomain.y1[0] + currentY1Range * Math.abs(zoomFactor) * 0.5
        newY1Max = zoomDomain.y1[1] - currentY1Range * Math.abs(zoomFactor) * 0.5
        newY2Min = zoomDomain.y2[0] + currentY2Range * Math.abs(zoomFactor) * 0.5
        newY2Max = zoomDomain.y2[1] - currentY2Range * Math.abs(zoomFactor) * 0.5
      } else {
        // Zoom out
        newXMin = Math.max(0, zoomDomain.x[0] - currentXRange * zoomFactor * mouseX)
        newXMax = Math.min(data.length - 1, zoomDomain.x[1] + currentXRange * zoomFactor * (1 - mouseX))
        newY1Min = Math.max(0, zoomDomain.y1[0] - currentY1Range * zoomFactor * 0.5)
        newY1Max = Math.min(5, zoomDomain.y1[1] + currentY1Range * zoomFactor * 0.5)
        newY2Min = Math.max(0, zoomDomain.y2[0] - currentY2Range * zoomFactor * 0.5)
        newY2Max = Math.min(10, zoomDomain.y2[1] + currentY2Range * zoomFactor * 0.5)
      }

      // Ensure minimum zoom range
      if (newXMax - newXMin < 0.5) return
      if (newY1Max - newY1Min < 0.5) return
      if (newY2Max - newY2Min < 0.5) return

      // Update zoom domain
      setZoomDomain({
        x: [newXMin, newXMax],
        y1: [newY1Min, newY1Max],
        y2: [newY2Min, newY2Max],
      })
    }

    // Add event listener
    const chartContainer = chartContainerRef.current
    if (chartContainer) {
      chartContainer.addEventListener("wheel", handleWheel, { passive: false })
    }

    // Cleanup
    return () => {
      if (chartContainer) {
        chartContainer.removeEventListener("wheel", handleWheel)
      }
    }
  }, [zoomDomain, data.length])

  // Add panning functionality
  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (!chartContainerRef.current) return

      // Start panning
      setIsPanning(true)
      setStartPanPosition({ x: e.clientX, y: e.clientY })
      setStartDomain({ ...zoomDomain })

      // Change cursor
      document.body.style.cursor = "grabbing"
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!isPanning || !chartContainerRef.current) return

      // Calculate movement delta
      const deltaX = e.clientX - startPanPosition.x
      const deltaY = e.clientY - startPanPosition.y

      // Get container dimensions
      const rect = chartContainerRef.current.getBoundingClientRect()

      // Calculate domain movement based on delta
      // Negative deltaX means move right, positive means move left
      const xRatio = deltaX / rect.width
      const yRatio = deltaY / rect.height

      const xRange = startDomain.x[1] - startDomain.x[0]
      const y1Range = startDomain.y1[1] - startDomain.y1[0]
      const y2Range = startDomain.y2[1] - startDomain.y2[0]

      // Calculate new domain values
      let newXMin = startDomain.x[0] - xRatio * xRange
      let newXMax = startDomain.x[1] - xRatio * xRange
      let newY1Min = startDomain.y1[0] + yRatio * y1Range
      let newY1Max = startDomain.y1[1] + yRatio * y1Range
      let newY2Min = startDomain.y2[0] + yRatio * y2Range
      let newY2Max = startDomain.y2[1] + yRatio * y2Range

      // Ensure we don't pan beyond data boundaries
      if (newXMin < 0) {
        newXMin = 0
        newXMax = xRange
      }

      if (newXMax > data.length - 1) {
        newXMax = data.length - 1
        newXMin = newXMax - xRange
      }

      if (newY1Min < 0) {
        newY1Min = 0
        newY1Max = y1Range
      }

      if (newY1Max > 5) {
        newY1Max = 5
        newY1Min = newY1Max - y1Range
      }

      if (newY2Min < 0) {
        newY2Min = 0
        newY2Max = y2Range
      }

      if (newY2Max > 10) {
        newY2Max = 10
        newY2Min = newY2Max - y2Range
      }

      // Update zoom domain
      setZoomDomain({
        x: [newXMin, newXMax],
        y1: [newY1Min, newY1Max],
        y2: [newY2Min, newY2Max],
      })
    }

    const handleMouseUp = () => {
      // End panning
      setIsPanning(false)

      // Reset cursor
      document.body.style.cursor = "default"
    }

    // Add event listeners
    const chartContainer = chartContainerRef.current
    if (chartContainer) {
      chartContainer.addEventListener("mousedown", handleMouseDown)
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    // Cleanup
    return () => {
      if (chartContainer) {
        chartContainer.removeEventListener("mousedown", handleMouseDown)
      }
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isPanning, startPanPosition, startDomain, zoomDomain, data.length])

  // Monitor fullscreen changes
  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullScreenChange)

    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange)
    }
  }, [])

  // Function to handle zoom in
  const handleZoomIn = () => {
    const currentXRange = zoomDomain.x[1] - zoomDomain.x[0]
    const currentY1Range = zoomDomain.y1[1] - zoomDomain.y1[0]
    const currentY2Range = zoomDomain.y2[1] - zoomDomain.y2[0]

    // Zoom in by 20%
    const newXMin = zoomDomain.x[0] + currentXRange * 0.1
    const newXMax = zoomDomain.x[1] - currentXRange * 0.1
    const newY1Min = zoomDomain.y1[0] + currentY1Range * 0.1
    const newY1Max = zoomDomain.y1[1] - currentY1Range * 0.1
    const newY2Min = zoomDomain.y2[0] + currentY2Range * 0.1
    const newY2Max = zoomDomain.y2[1] - currentY2Range * 0.1

    // Ensure minimum zoom range
    if (newXMax - newXMin < 0.5) return
    if (newY1Max - newY1Min < 0.5) return
    if (newY2Max - newY2Min < 0.5) return

    setZoomDomain({
      x: [newXMin, newXMax],
      y1: [newY1Min, newY1Max],
      y2: [newY2Min, newY2Max],
    })
  }

  // Function to handle zoom out
  const handleZoomOut = () => {
    const currentXRange = zoomDomain.x[1] - zoomDomain.x[0]
    const currentY1Range = zoomDomain.y1[1] - zoomDomain.y1[0]
    const currentY2Range = zoomDomain.y2[1] - zoomDomain.y2[0]

    // Zoom out by 20%
    const newXMin = Math.max(0, zoomDomain.x[0] - currentXRange * 0.1)
    const newXMax = Math.min(data.length - 1, zoomDomain.x[1] + currentXRange * 0.1)
    const newY1Min = Math.max(0, zoomDomain.y1[0] - currentY1Range * 0.1)
    const newY1Max = Math.min(5, zoomDomain.y1[1] + currentY1Range * 0.1)
    const newY2Min = Math.max(0, zoomDomain.y2[0] - currentY2Range * 0.1)
    const newY2Max = Math.min(10, zoomDomain.y2[1] + currentY2Range * 0.1)

    setZoomDomain({
      x: [newXMin, newXMax],
      y1: [newY1Min, newY1Max],
      y2: [newY2Min, newY2Max],
    })
  }

  // Function to handle search
  const handleSearch = () => {
    setShowSearch(!showSearch)
    if (!showSearch) {
      setSearchTerm("")
      setSearchResults([])
      resetHighlights()
    } else {
      resetHighlights()
    }
  }

  // Function to reset highlights
  const resetHighlights = () => {
    setData(data.map((item) => ({ ...item, highlighted: false })))
  }

  // Function to apply search
  const applySearch = () => {
    if (!searchTerm) return

    // Reset previous highlights
    const newData = [...data].map((item) => ({ ...item, highlighted: false }))

    // Find all matching indices
    const matchingIndices = data
      .map((item, index) => (item.name.toLowerCase().includes(searchTerm.toLowerCase()) ? index : -1))
      .filter((index) => index !== -1)

    setSearchResults(matchingIndices)

    if (matchingIndices.length > 0) {
      // Highlight matching items
      matchingIndices.forEach((index) => {
        if (index >= 0 && index < newData.length) {
          newData[index].highlighted = true
        }
      })

      setData(newData)

      // If only one result, adjust zoom to focus on it
      if (matchingIndices.length === 1) {
        const index = matchingIndices[0]
        setZoomDomain({
          ...zoomDomain,
          x: [Math.max(0, index - 1), Math.min(data.length - 1, index + 1)],
        })
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
    if (!chartRef.current) return

    // Use html2canvas or a similar library to capture the chart
    // For simplicity, we'll just open a window with the chart data
    const printWindow = window.open("", "_blank")
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Chart Print</title>
            <style>
              body { margin: 0; padding: 20px; font-family: Arial, sans-serif; }
              table { border-collapse: collapse; width: 100%; }
              th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
              th { background-color: #f2f2f2; }
              h2 { color: #333; }
            </style>
          </head>
          <body>
            <h2>Chart Data</h2>
            <table>
              <tr>
                <th>Date</th>
                <th>Number of orders</th>
                <th>Payments</th>
              </tr>
              ${data
                .map(
                  (item) => `
                <tr>
                  <td>${item.name}</td>
                  <td>${item.orders}</td>
                  <td>${item.payments}</td>
                </tr>
              `,
                )
                .join("")}
            </table>
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
    // Reset zoom
    setZoomDomain({
      x: [0, data.length - 1],
      y1: [0, 5],
      y2: [0, 10],
    })

    // Reset highlights
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

  // Function to download chart as PNG
  const handleDownloadPNG = () => {
    if (!chartRef.current) return

    // Create a canvas element
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const chartElement = chartRef.current
    const rect = chartElement.getBoundingClientRect()
    canvas.width = rect.width
    canvas.height = rect.height

    // Draw a white background
    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Use html2canvas or similar library to capture the chart
    // For this example, we'll create a simple representation

    // Draw chart title
    ctx.fillStyle = "black"
    ctx.font = "16px Arial"
    ctx.textAlign = "center"
    ctx.fillText("Orders and Payments Chart", canvas.width / 2, 20)

    // Create a download link
    const link = document.createElement("a")
    link.download = "chart.png"

    // Convert canvas to data URL
    canvas.toBlob((blob) => {
      if (!blob) return

      const url = URL.createObjectURL(blob)
      link.href = url
      link.click()

      // Clean up
      URL.revokeObjectURL(url)
    })

    setShowMenu(false)
  }

  // Function to download data as CSV
  const handleDownloadCSV = () => {
    // Create CSV content
    const headers = ["Date", "Number of orders", "Payments"]
    const csvRows = [headers.join(","), ...data.map((item) => [item.name, item.orders, item.payments].join(","))]

    const csvContent = csvRows.join("\n")

    // Create a blob
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)

    // Create download link
    const link = document.createElement("a")
    link.href = url
    link.setAttribute("download", "chart-data.csv")
    link.click()

    // Clean up
    URL.revokeObjectURL(url)

    setShowMenu(false)
  }

  // Function to toggle fullscreen
  const handleFullScreen = () => {
    if (!fullScreenContainerRef.current) return

    if (!document.fullscreenElement) {
      // Enter fullscreen
      fullScreenContainerRef.current.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`)
      })
    } else {
      // Exit fullscreen
      document.exitFullscreen()
    }

    setShowMenu(false)
  }

  // Function to share chart
  const handleShareChart = () => {
    // Check if Web Share API is available
    if (navigator.share) {
      navigator
        .share({
          title: "Orders and Payments Chart",
          text: "Check out this chart showing orders and payments data",
          url: window.location.href,
        })
        .catch((error) => {
          console.error("Error sharing:", error)
        })
    } else {
      // Fallback to copying URL to clipboard
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => {
          setShowShareTooltip(true)
          setTimeout(() => setShowShareTooltip(false), 2000)
        })
        .catch((err) => {
          console.error("Failed to copy URL: ", err)
        })
    }

    setShowMenu(false)
  }

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 shadow-md rounded-md">
          <p className="text-sm font-medium">{label}</p>
          <p className="text-sm text-gray-600">
            <span className="inline-block w-3 h-3 bg-[#7fe0ed] mr-1 rounded-full"></span>
            Orders: {payload[0].value}
          </p>
          <p className="text-sm text-gray-600">
            <span className="inline-block w-3 h-3 bg-[#007bff] mr-1 rounded-full"></span>
            Payments: {payload[1].value}
          </p>
        </div>
      )
    }
    return null
  }

  // Calculate visible data based on zoom domain
  const visibleData = data.slice(Math.floor(zoomDomain.x[0]), Math.ceil(zoomDomain.x[1]) + 1)

  return (
    <div
      className={`w-full max-w-4xl mx-auto bg-white p-4 rounded-lg shadow-sm ${isFullScreen ? "h-screen flex flex-col" : ""}`}
      ref={fullScreenContainerRef}
    >
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
          <div className="absolute right-0 top-10 bg-white shadow-md rounded-md p-2 z-10 w-48">
            <ul className="text-sm">
              <li
                className="p-1.5 hover:bg-gray-100 cursor-pointer rounded flex items-center"
                onClick={handleDownloadPNG}
              >
                <Download className="w-4 h-4 mr-2 text-gray-500" />
                Download PNG
              </li>
              <li
                className="p-1.5 hover:bg-gray-100 cursor-pointer rounded flex items-center"
                onClick={handleDownloadCSV}
              >
                <FileText className="w-4 h-4 mr-2 text-gray-500" />
                Download CSV
              </li>
              <li
                className="p-1.5 hover:bg-gray-100 cursor-pointer rounded flex items-center"
                onClick={handleFullScreen}
              >
                <Maximize2 className="w-4 h-4 mr-2 text-gray-500" />
                {isFullScreen ? "Exit Full Screen" : "View Full Screen"}
              </li>
              <li
                className="p-1.5 hover:bg-gray-100 cursor-pointer rounded flex items-center relative"
                onClick={handleShareChart}
              >
                <Share2 className="w-4 h-4 mr-2 text-gray-500" />
                Share Chart
                {showShareTooltip && (
                  <div className="absolute right-0 top-full mt-1 bg-black text-white text-xs p-1 rounded">
                    URL copied to clipboard!
                  </div>
                )}
              </li>
            </ul>
          </div>
        )}
      </div>
      <div
        className={`${isFullScreen ? "flex-1" : "h-[300px]"} relative ${isPanning ? "cursor-grabbing" : "cursor-grab"}`}
        ref={chartRef}
        // Add a separate ref for the chart container to handle wheel events
        ref={chartContainerRef}
      >
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={visibleData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" domain={["auto", "auto"]} tick={{ fontSize: 12 }} />
            <YAxis
              yAxisId="left"
              domain={[zoomDomain.y1[0], zoomDomain.y1[1]]}
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => value.toFixed(1)}
              tickCount={6}
              stroke="#36A2EB"
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              domain={[zoomDomain.y2[0], zoomDomain.y2[1]]}
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => value.toFixed(1)}
              tickCount={6}
              stroke="#36A2EB"
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{
                paddingTop: 10,
                fontSize: 12,
              }}
              payload={[
                { value: "Number of orders", type: "rect", color: "#7fe0ed" },
                { value: "Payments", type: "rect", color: "#007bff" },
              ]}
            />
            <Bar
              yAxisId="left"
              dataKey="orders"
              name="Number of orders"
              fill="#7fe0ed"
              radius={[2, 2, 0, 0]}
              fillOpacity={0.8}
              // Apply highlighting
              isAnimationActive={false}
              shape={(props: any) => {
                const { x, y, width, height, index } = props
                const isHighlighted = data[index + Math.floor(zoomDomain.x[0])]?.highlighted
                return (
                  <rect
                    x={x}
                    y={y}
                    width={width}
                    height={height}
                    fill={isHighlighted ? "rgba(255, 99, 132, 0.8)" : "#7fe0ed"}
                    fillOpacity={0.8}
                    rx={2}
                    ry={2}
                  />
                )
              }}
            />
            <Area
              yAxisId="right"
              dataKey="payments"
              name="Payments"
              type="monotone"
              fill="#007bff"
              fillOpacity={0.2}
              stroke="#007bff"
              strokeWidth={2}
              // Apply highlighting
              isAnimationActive={false}
              activeDot={{ r: 6 }}
              dot={(props: any) => {
                const { cx, cy, index } = props
                const isHighlighted = data[index + Math.floor(zoomDomain.x[0])]?.highlighted
                return (
                  <circle
                    cx={cx}
                    cy={cy}
                    r={4}
                    fill={isHighlighted ? "rgba(255, 99, 132, 1)" : "#007bff"}
                    stroke={isHighlighted ? "rgba(255, 99, 132, 1)" : "#007bff"}
                  />
                )
              }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-2 text-xs text-gray-500 text-center">Tip: Use mouse wheel to zoom, click and drag to pan</div>
    </div>
  )
}


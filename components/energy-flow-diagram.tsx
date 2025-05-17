"use client"

import type React from "react"
import { useState } from "react"
import StaticInverterNode from "./static-nodes/inverter"
import StaticSwitchNode from "./static-nodes/static-switch-node"
import StaticWordNode from "./static-nodes/static-word-node"
import { useWindowDimensions } from "@/hooks/useWindowDimensions"

// Simple Bulb Component to replace the imported TraditionalBulbNode
const SimpleBulbNode = ({ position, bulbOn, scale = 1 }: { position: { x: number; y: number }, bulbOn: boolean, scale?: number }) => {
  const width = 100 * scale;
  const height = 150 * scale;
  
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <div
        className="absolute"
        style={{
          width: width * 0.8,
          height: height * 0.8,
          borderRadius: "50%",
          opacity: bulbOn ? 0.4 : 0,
          background: "radial-gradient(circle, rgba(144, 238, 144, 0.8) 0%, rgba(0, 255, 128, 0.2) 70%)",
          filter: "blur(10px)",
          transition: "opacity 0.5s ease",
          zIndex: 0,
          transform: "translate(-50%, -50%)",
        }}
      />

      <svg
        width={width}
        height={height}
        viewBox="0 0 100 150"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: "relative", zIndex: 1 }}
      >
        {/* Bulb glass */}
        <ellipse
          cx="50"
          cy="50"
          rx="30"
          ry="40"
          fill={bulbOn ? "rgba(255, 255, 255, 0.3)" : "rgba(255, 255, 255, 0.1)"}
          stroke={bulbOn ? "#ffffff" : "#888888"}
          strokeWidth="1"
        />

        {/* Filament */}
        <path
          d="M40 50 Q 50 30, 60 50 Q 50 70, 40 50"
          stroke={bulbOn ? "#ffcc00" : "#666666"}
          strokeWidth="1.5"
          fill="none"
        />

        {/* Base */}
        <rect
          x="42"
          y="90"
          width="16"
          height="10"
          fill={bulbOn ? "#e0e0e0" : "#888888"}
          stroke={bulbOn ? "#ffffff" : "#666666"}
          strokeWidth="1"
        />

        {/* Connection to glass */}
        <path
          d="M42 90 L45 80 Q 50 75, 55 80 L58 90"
          fill={bulbOn ? "#e0e0e0" : "#888888"}
          stroke={bulbOn ? "#ffffff" : "#666666"}
          strokeWidth="1"
        />

        {/* Inner glow when active */}
        {bulbOn && (
          <>
            <ellipse cx="50" cy="50" rx="15" ry="25" fill="rgba(255, 255, 200, 0.6)" />
            <ellipse cx="50" cy="50" rx="8" ry="15" fill="rgba(255, 255, 150, 0.8)" />
          </>
        )}
      </svg>
    </div>
  );
};

export const EnergyFlowDiagram: React.FC = () => {
  const [isActive, setIsActive] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const { windowWidth } = useWindowDimensions()
  const isMobile = windowWidth < 768

  // Calculate spacing based on screen size
  const containerPadding = isMobile ? 20 : 40
  const componentWidth = isMobile ? 80 : 120
  const componentHeight = isMobile ? 120 : 180
  const spacing = isMobile ? 30 : 60

  // Calculate total width needed for components and spacing
  const totalComponentsWidth = componentWidth * 4 // 4 components
  const totalSpacingWidth = spacing * 3 // 3 spaces between components
  const totalWidth = totalComponentsWidth + totalSpacingWidth + containerPadding * 2

  // Calculate scale factor if needed
  const availableWidth = windowWidth - 40 // 20px margin on each side
  const scaleFactor = availableWidth < totalWidth ? availableWidth / totalWidth : 1

  // Apply scale factor to dimensions
  const adjustedComponentWidth = componentWidth * scaleFactor
  const adjustedComponentHeight = componentHeight * scaleFactor
  const adjustedSpacing = spacing * scaleFactor

  // Toggle activation
  const toggleActivation = () => {
    setIsActive(!isActive)
    if (!isActive) {
      setIsAnimating(true)
      // Reset animation after it completes
      setTimeout(() => {
        setIsAnimating(false)
      }, 3000) // Animation duration
    }
  }

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="relative mx-auto rounded-xl p-6 flex flex-col items-center justify-center"
        style={{
          backgroundColor: "#0a1628",
          minHeight: "400px",
          border: "1px solid rgba(0, 255, 128, 0.2)",
          boxShadow: "0 0 20px rgba(0, 255, 128, 0.1)",
        }}
      >
        {/* Background particles */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-green-500 opacity-10"
              style={{
                width: Math.random() * 3 + 1 + "px",
                height: Math.random() * 3 + 1 + "px",
                top: Math.random() * 100 + "%",
                left: Math.random() * 100 + "%",
                animation: `float ${Math.random() * 10 + 10}s linear infinite`,
              }}
            />
          ))}
        </div>

        {/* Components container */}
        <div className="relative flex items-center justify-center w-full py-10">
          <div className="flex items-center justify-between w-full max-w-6xl">
            {/* Inverter Node */}
            <div className="flex flex-col items-center">
              <div
                className="relative mb-2"
                style={{
                  width: adjustedComponentWidth * 1.2,
                  height: adjustedComponentHeight * 1.2,
                  border: "1px solid rgba(0, 255, 128, 0.3)",
                  borderRadius: "8px",
                  padding: "10px",
                  boxShadow: isActive ? "0 0 15px rgba(0, 255, 128, 0.3)" : "none",
                  transition: "box-shadow 0.3s ease",
                }}
              >
                <StaticInverterNode
                  position={{ x: adjustedComponentWidth * 0.6, y: adjustedComponentHeight * 0.6 }}
                  inverterOn={isActive}
                  onInverterChange={() => {}}
                  solarConnected={isActive}
                  gridConnected={false}
                  batteryConnected={isActive}
                  loadPercentage={isActive ? 60 : 0}
                  mode={isActive ? "pv" : "normal"}
                  scale={0.3}
                />
              </div>
              <span className="text-green-400 text-sm">Inverter</span>
            </div>

            {/* Connection 1 */}
            <svg className="h-4" style={{ width: adjustedSpacing * 1.5 }}>
              <line
                x1="0"
                y1="2"
                x2={adjustedSpacing * 1.5}
                y2="2"
                stroke={isActive ? "#4ade80" : "#1e293b"}
                strokeWidth="2"
                strokeLinecap="round"
              />
              {isActive && (
                <circle r="3" fill="#4ade80">
                  <animateMotion dur="2s" repeatCount="indefinite" path={`M0,2 L${adjustedSpacing * 1.5},2`} />
                </circle>
              )}
            </svg>

            {/* Switch Node */}
            <div className="flex flex-col items-center">
              <div
                className="relative mb-2"
                style={{
                  width: adjustedComponentWidth * 0.8,
                  height: adjustedComponentHeight * 0.8,
                  border: "1px solid rgba(0, 255, 128, 0.3)",
                  borderRadius: "8px",
                  padding: "10px",
                  boxShadow: isActive ? "0 0 15px rgba(0, 255, 128, 0.3)" : "none",
                  transition: "box-shadow 0.3s ease",
                }}
              >
                <StaticSwitchNode
                  position={{ x: adjustedComponentWidth * 0.4, y: adjustedComponentHeight * 0.4 }}
                  switchOn={isActive}
                  onSwitchChange={() => {}}
                  scale={0.5}
                />
              </div>
              <span className="text-green-400 text-sm">Switch</span>
            </div>

            {/* Connection 2 */}
            <svg className="h-4" style={{ width: adjustedSpacing * 1.5 }}>
              <line
                x1="0"
                y1="2"
                x2={adjustedSpacing * 1.5}
                y2="2"
                stroke={isActive ? "#4ade80" : "#1e293b"}
                strokeWidth="2"
                strokeLinecap="round"
              />
              {isActive && (
                <circle r="3" fill="#4ade80">
                  <animateMotion
                    dur="2s"
                    repeatCount="indefinite"
                    path={`M0,2 L${adjustedSpacing * 1.5},2`}
                    begin="0.5s"
                  />
                </circle>
              )}
            </svg>

            {/* Bulb Node */}
            <div className="flex flex-col items-center">
              <div
                className="relative mb-2"
                style={{
                  width: adjustedComponentWidth * 0.8,
                  height: adjustedComponentHeight * 0.8,
                  border: "1px solid rgba(0, 255, 128, 0.3)",
                  borderRadius: "8px",
                  padding: "10px",
                  boxShadow: isActive ? "0 0 15px rgba(0, 255, 128, 0.3)" : "none",
                  transition: "box-shadow 0.3s ease",
                }}
              >
                <SimpleBulbNode
                  position={{ x: adjustedComponentWidth * 0.4, y: adjustedComponentHeight * 0.4 }}
                  bulbOn={isActive}
                  scale={0.5}
                />
              </div>
              <span className="text-green-400 text-sm">Bulb</span>
            </div>

            {/* Connection 3 */}
            <svg className="h-4" style={{ width: adjustedSpacing * 1.5 }}>
              <line
                x1="0"
                y1="2"
                x2={adjustedSpacing * 1.5}
                y2="2"
                stroke={isActive ? "#4ade80" : "#1e293b"}
                strokeWidth="2"
                strokeLinecap="round"
              />
              {isActive && (
                <circle r="3" fill="#4ade80">
                  <animateMotion
                    dur="2s"
                    repeatCount="indefinite"
                    path={`M0,2 L${adjustedSpacing * 1.5},2`}
                    begin="1s"
                  />
                </circle>
              )}
            </svg>

            {/* Word Node */}
            <div className="flex flex-col items-center">
              <div
                className="relative mb-2"
                style={{
                  width: adjustedComponentWidth * 0.8,
                  height: adjustedComponentHeight * 0.6,
                  border: "1px solid rgba(0, 255, 128, 0.3)",
                  borderRadius: "8px",
                  padding: "10px",
                  boxShadow: isActive ? "0 0 15px rgba(0, 255, 128, 0.3)" : "none",
                  transition: "box-shadow 0.3s ease",
                }}
              >
                <StaticWordNode
                  position={{ x: adjustedComponentWidth * 0.4, y: adjustedComponentHeight * 0.3 }}
                  word="GREAN"
                  illuminated={isActive}
                  scale={0.5}
                  cycleWords={false}
                />
              </div>
              <span className="text-green-400 text-sm">Output</span>
            </div>
          </div>
        </div>

        {/* Activation button */}
        <button
          onClick={toggleActivation}
          className={`mt-8 px-6 py-2 rounded-full font-medium transition-all duration-300 ${
            isActive ? "bg-red-500 hover:bg-red-600 text-white" : "bg-green-500 hover:bg-green-600 text-white"
          }`}
        >
          {isActive ? "Deactivate" : "Activate"}
        </button>
      </div>
    </div>
  )
}

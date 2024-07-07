import React, { useState } from 'react'

interface Tab {
  name: string
  content: React.ReactNode
}

interface PlayerDrawerProps {
  tabs: Array<Tab>
}

export const PlayerDrawer = ({ tabs }: PlayerDrawerProps) => {
  const [activeTab, setActiveTab] = useState(0)

  const handleTabClick = (index: number) => {
    setActiveTab(index)
  }

  return (
    <div className="w-full max-w-md mx-auto mt-8">
      <div className="flex border-b border-gray-200">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`flex-1 py-2 text-center ${
              activeTab === index
                ? 'border-b-2 border-blue-500 text-blue-500'
                : 'text-gray-500'
            }`}
            onClick={() => handleTabClick(index)}
          >
            {tab.name}
          </button>
        ))}
      </div>
      <div className="p-4">{tabs[activeTab].content}</div>
    </div>
  )
}

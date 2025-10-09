import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Tabs({ items = [], types = [], value, onValueChange }) {
  const [activeTab, setActiveTab] = useState(value || types[0]);

  const handleTabChange = (type) => {
    setActiveTab(type);
    onValueChange && onValueChange(type);
  };

  const filteredItems = (items || []).filter(item => item.type === activeTab);

  return (
    <div className="w-full">
      <TabsList types={types} activeTab={activeTab} setActiveTab={handleTabChange} />

      <AnimatePresence exitBeforeEnter>
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-6 mt-4"
        >
          {filteredItems.map((item, idx) => (
            <div
              key={idx}
              className="p-4 border rounded-xl shadow hover:shadow-lg transition-shadow bg-white"
            >
              <h2 className="text-lg font-semibold">{item.title || item.name}</h2>
              <p className="text-gray-600">{item.description}</p>
              {item.price && <p className="font-bold mt-2">Preis: €{item.price}</p>}
              {item.duration && <p>Dauer: {item.duration}</p>}
              {item.image_url && (
                <img
                  src={item.image_url}
                  alt={item.title || item.name}
                  className="w-full max-w-sm rounded-md mt-2"
                />
              )}
            </div>
          ))}

          {filteredItems.length === 0 && <p className="text-gray-500">Keine Angebote in dieser Kategorie.</p>}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export function TabsList({ types, activeTab, setActiveTab }) {
  return (
    <div className="flex flex-wrap gap-2 justify-center mb-4">
      {types.map((type) => (
        <TabsTrigger
          key={type}
          type={type}
          active={activeTab === type}
          onClick={() => setActiveTab(type)}
        />
      ))}
    </div>
  );
}

export function TabsTrigger({ type, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full font-medium transition-colors ${
        active
          ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`}
    >
      {type.replace("_", " ")}
    </button>
  );
}

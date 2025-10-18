import React from "react";

export default function LanyardBadge() {
  return (
    <div className="absolute top-0 right-8 w-80">
      {/* Realistic Lanyard Strap */}
      <div className="relative">
        {/* Main Strap - Flat ribbon style with subtle sway animation */}
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-44 shadow-md transform rotate-1 animate-subtle-sway"
          style={{
            background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 25%, #dee2e6 50%, #e9ecef 75%, #f8f9fa 100%)',
            borderRadius: '2px',
            border: '1px solid rgba(0,0,0,0.1)'
          }}
        />
        
        {/* Strap Reflection/Highlight */}
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-44 transform rotate-1 animate-subtle-sway"
          style={{
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.1) 100%)',
            marginLeft: '-12px',
            animationDelay: '0.1s'
          }}
        />

        {/* Metal Clip - Realistic style with slight bounce */}
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-12 h-12 transform rotate-1 animate-gentle-bounce">
          {/* Clip body */}
          <div 
            className="w-full h-full rounded-full shadow-lg border"
            style={{
              background: 'linear-gradient(135deg, #c0c0c0 0%, #a8a8a8 25%, #888888 50%, #a8a8a8 75%, #c0c0c0 100%)',
              borderColor: '#666'
            }}
          />
          {/* Clip highlight */}
          <div 
            className="absolute top-1 left-1 w-4 h-4 rounded-full"
            style={{
              background: 'rgba(255,255,255,0.7)'
            }}
          />
          {/* Clip center hole */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full"
            style={{
              background: '#333',
              boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.5)'
            }}
          />
        </div>

        {/* ID Badge - Exactly like reference with gentle swing */}
        <div className="absolute top-40 left-1/2 -translate-x-1/2 transform rotate-1 animate-gentle-swing">
          <div 
            className="bg-white shadow-xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            style={{
              width: '260px',
              borderRadius: '8px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08)'
            }}
          >
            {/* Photo with realistic border */}
            <div className="p-4">
              <div
                className="relative overflow-hidden hover:scale-105 transition-transform duration-500"
                style={{
                  borderRadius: '4px',
                  border: '1px solid #e5e7eb'
                }}
              >
                <img
                  src="wasih-img.webp"
                  srcSet="wasih-img-400w.webp 400w, wasih-img-800w.webp 800w, wasih-img-1200w.webp 1200w"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 400px, 260px"
                  alt="Profile ID"
                  width="400"
                  height="570"
                  className="w-full h-80 object-cover"
                  loading="eager"
                  decoding="async"
                  fetchpriority="high"
                  style={{
                    filter: 'contrast(1.05) brightness(1.02)'
                  }}
                />
                {/* Photo corner shadow */}
                <div
                  className="absolute top-0 right-0 w-4 h-4 pointer-events-none"
                  style={{
                    background: 'linear-gradient(-45deg, transparent 40%, rgba(0,0,0,0.05) 50%, rgba(0,0,0,0.1) 60%)'
                  }}
                />
              </div>
            </div>
          </div>
          
          {/* Badge shadow on surface with subtle movement */}
          <div 
            className="absolute top-1 left-1 w-full h-full -z-10 animate-shadow-shift"
            style={{
              background: 'rgba(0,0,0,0.08)',
              borderRadius: '8px',
              filter: 'blur(2px)'
            }}
          />
        </div>
      </div>
    </div>
  );
}

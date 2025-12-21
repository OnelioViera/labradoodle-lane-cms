'use client'

import React from 'react'

export const ImagePreview: React.FC<{ value?: string }> = ({ value }) => {
  if (!value || !value.startsWith('http')) {
    return null
  }

  return (
    <div style={{ marginTop: '1rem' }}>
      <p style={{ marginBottom: '0.5rem', fontWeight: 600 }}>Preview:</p>
      <img
        src={value}
        alt="Preview"
        style={{
          maxWidth: '400px',
          maxHeight: '300px',
          objectFit: 'contain',
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
        }}
      />
    </div>
  )
}


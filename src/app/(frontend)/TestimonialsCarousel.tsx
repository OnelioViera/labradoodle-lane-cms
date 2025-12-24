'use client'

import { useEffect, useRef, useState } from 'react'

export default function TestimonialsCarousel({ testimonials }: { testimonials: any[] }) {
  const carouselRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  // Auto-play every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      scrollToNext()
    }, 5000)

    return () => clearInterval(interval)
  }, [currentIndex, testimonials.length])

  const scrollToNext = () => {
    if (!carouselRef.current) return
    const nextIndex = (currentIndex + 1) % testimonials.length
    const cardWidth = 350 + 32 // card width + gap
    carouselRef.current.scrollTo({
      left: nextIndex * cardWidth,
      behavior: 'smooth',
    })
    setCurrentIndex(nextIndex)
  }

  const scrollToPrev = () => {
    if (!carouselRef.current) return
    const prevIndex = currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1
    const cardWidth = 350 + 32
    carouselRef.current.scrollTo({
      left: prevIndex * cardWidth,
      behavior: 'smooth',
    })
    setCurrentIndex(prevIndex)
  }

  return (
    <div className="carousel-container">
      <button className="carousel-button carousel-button-prev" onClick={scrollToPrev}>
        ‹
      </button>
      
      <div className="testimonials-grid" ref={carouselRef}>
        {testimonials.map((testimonial: any) => (
          <div key={testimonial.id} className="testimonial-card">
            <div className="testimonial-rating">
              {testimonial.rating && (
                <div className="stars">
                  {'⭐'.repeat(Math.min(5, Math.max(0, testimonial.rating)))}
                </div>
              )}
            </div>
            <div className="testimonial-text">&ldquo;{testimonial.testimonial}&rdquo;</div>
            <div className="testimonial-author">
              <div className="author-avatar">
                {testimonial.authorName?.charAt(0).toUpperCase() || 'A'}
              </div>
              <div className="author-info">
                <strong>{testimonial.authorName}</strong>
                {testimonial.location && <span>{testimonial.location}</span>}
                {testimonial.puppyName && (
                  <span className="puppy-name">Puppy: {testimonial.puppyName}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="carousel-button carousel-button-next" onClick={scrollToNext}>
        ›
      </button>
    </div>
  )
}


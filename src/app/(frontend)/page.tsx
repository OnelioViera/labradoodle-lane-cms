import { getPayload } from 'payload'
import config from '@/payload.config'
import Link from 'next/link'
import Image from 'next/image'
import type { Testimonial, Puppy, Dog } from '@/payload-types'

export const metadata = {
  title: 'Golden Valley Kennels - Premium Golden Retriever Breeder',
  description: 'Premium Golden Retriever breeder dedicated to health, temperament, and excellence',
}

// Helper function to get image URL
function getImageUrl(photo: any): string | null {
  if (!photo) return null

  const supabaseURL = 'https://vpxusoradahmqsskbtuj.supabase.co' // Hardcode for now

  // If photo is an object with url property
  if (typeof photo === 'object' && photo.url) {
    // If it's a relative Payload URL, convert to Supabase URL
    if (photo.url.startsWith('/api/media/file/')) {
      const filename = photo.url.replace('/api/media/file/', '')
      const fullURL = `${supabaseURL}/storage/v1/object/public/media/${filename}`
      console.log('Converting URL:', photo.url, '→', fullURL)
      return fullURL
    }

    // If it's already a full URL, use it
    if (photo.url.startsWith('http')) {
      return photo.url
    }

    // Otherwise, assume it's a Supabase filename
    const fullURL = `${supabaseURL}/storage/v1/object/public/media/${photo.url}`
    console.log('Direct filename:', photo.url, '→', fullURL)
    return fullURL
  }

  return null
}

export default async function HomePage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  // Fetch available puppies
  const puppiesData = await payload.find({
    collection: 'puppies',
    where: {
      status: {
        equals: 'available',
      },
    },
    limit: 6,
    sort: '-createdAt',
  })

  // Fetch featured dogs
  const dogsData = await payload.find({
    collection: 'dogs',
    where: {
      featured: {
        equals: true,
      },
    },
    limit: 4,
  })

  // Fetch featured testimonials
  const testimonialsData = await payload.find({
    collection: 'testimonials',
    where: {
      featured: {
        equals: true,
      },
    },
    limit: 3,
  })

  const puppies = puppiesData.docs
  const dogs = dogsData.docs
  const testimonials = testimonialsData.docs

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Golden Valley Kennels</h1>
          <p className="hero-subtitle">
            Premium Golden Retriever breeder dedicated to health, temperament, and excellence
          </p>
          <div className="hero-buttons">
            <Link href="/puppies" className="btn btn-primary">
              View Available Puppies
            </Link>
            <Link href="/contact" className="btn btn-secondary">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Available Puppies Section */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>Available Puppies</h2>
            <p>Meet our beautiful, health-tested puppies ready for their forever homes</p>
          </div>

          {puppies.length > 0 ? (
            <>
              <div className="puppies-grid">
                {puppies.map((puppy: Puppy) => {
                  const imageUrl =
                    puppy.photos && puppy.photos.length > 0 ? getImageUrl(puppy.photos[0]) : null

                  return (
                    <Link href={`/puppies/${puppy.id}`} key={puppy.id} className="puppy-card">
                      <div className="puppy-image">
                        {imageUrl ? (
                          <Image
                            src={imageUrl}
                            alt={puppy.name}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            style={{ objectFit: 'cover' }}
                            priority={false}
                          />
                        ) : (
                          <div className="placeholder-image">
                            <div className="placeholder-icon">🐕</div>
                            <div className="placeholder-text">{puppy.name}</div>
                          </div>
                        )}
                      </div>
                      <div className="puppy-info">
                        <h3>{puppy.name}</h3>
                        <div className="puppy-details">
                          <p>
                            <strong>Sex:</strong> {puppy.sex === 'male' ? 'Male' : 'Female'}
                          </p>
                          {puppy.color && (
                            <p>
                              <strong>Color:</strong> {puppy.color}
                            </p>
                          )}
                          <p>
                            <strong>Price:</strong> ${puppy.price?.toLocaleString()}
                          </p>
                          {puppy.birthDate && (
                            <p>
                              <strong>Born:</strong>{' '}
                              {new Date(puppy.birthDate).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                        <span className="status-badge status-available">Available</span>
                      </div>
                    </Link>
                  )
                })}
              </div>
              <div className="text-center mt-2">
                <Link href="/puppies" className="btn btn-outline">
                  View All Puppies
                </Link>
              </div>
            </>
          ) : (
            <div className="no-puppies">
              <p>No puppies available at the moment. Check back soon or join our waiting list!</p>
              <Link href="/contact" className="btn btn-primary">
                Join Waiting List
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Our Dogs Section */}
      {dogs.length > 0 && (
        <section className="section section-alt">
          <div className="container">
            <div className="section-header">
              <h2>Our Breeding Dogs</h2>
              <p>Meet our exceptional breeding stock with champion bloodlines</p>
            </div>
            <div className="dogs-grid">
              {dogs.map((dog: Dog) => {
                const imageUrl =
                  dog.photos && dog.photos.length > 0 ? getImageUrl(dog.photos[0]) : null

                return (
                  <div key={dog.id} className="dog-card">
                    <div className="dog-image">
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={dog.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          style={{ objectFit: 'cover' }}
                        />
                      ) : (
                        <div className="placeholder-image">
                          <div className="placeholder-icon">🦮</div>
                          <div className="placeholder-text">{dog.name}</div>
                        </div>
                      )}
                    </div>
                    <div className="dog-info">
                      <h3>{dog.name}</h3>
                      {dog.registeredName && (
                        <p className="registered-name">{dog.registeredName}</p>
                      )}
                      <p className="role">
                        {dog.role === 'dam'
                          ? 'Dam (Female)'
                          : dog.role === 'sire'
                            ? 'Sire (Male)'
                            : 'Breeding Dog'}
                      </p>
                      {dog.healthClearances && (
                        <div className="health-summary">
                          {dog.healthClearances.hips && (
                            <span className="health-badge">✓ Hips</span>
                          )}
                          {dog.healthClearances.elbows && (
                            <span className="health-badge">✓ Elbows</span>
                          )}
                          {dog.healthClearances.eyes && (
                            <span className="health-badge">✓ Eyes</span>
                          )}
                          {dog.healthClearances.heart && (
                            <span className="health-badge">✓ Heart</span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="text-center mt-2">
              <Link href="/dogs" className="btn btn-outline">
                View All Our Dogs
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      {testimonials.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section-header">
              <h2>Happy Families</h2>
              <p>Hear what our puppy families have to say</p>
            </div>
            <div className="testimonials-grid">
              {testimonials.map((testimonial: Testimonial) => (
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
          </div>
        </section>
      )}

      {/* About Preview Section */}
      <section className="section section-alt">
        <div className="container">
          <div className="about-preview">
            <div className="about-content">
              <h2>Our Mission & Values</h2>
              <p>
                At Golden Valley Kennels, we are passionate about breeding healthy, well-tempered
                Golden Retrievers that become beloved family members. Our breeding program focuses
                on health, temperament, and conformation to breed standards.
              </p>
              <p>
                Every puppy is raised in our home with early neurological stimulation, extensive
                socialization, and lots of love. We perform comprehensive health testing on all
                breeding dogs and provide lifetime support to our puppy families.
              </p>
              <Link href="/about" className="btn btn-primary">
                Learn More About Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="section cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Welcome a Golden Retriever?</h2>
            <p>Contact us today to learn more about our available puppies and upcoming litters</p>
            <div className="cta-buttons">
              <Link href="/contact" className="btn btn-primary-large">
                Get in Touch
              </Link>
              <Link href="/puppies" className="btn btn-secondary-large">
                View Available Puppies
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

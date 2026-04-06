'use client'
import { useState } from 'react'
import Reveal from '../Reveal'

function extractVideoId(url) {
  if (!url) return null
  const short = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/)
  if (short) return short[1]
  const long = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/))([a-zA-Z0-9_-]{11})/)
  if (long) return long[1]
  return null
}

function VideoSlide({ video, animClass, onAnimationEnd }) {
  const [playing, setPlaying] = useState(false)
  const videoId = extractVideoId(video.youtube_url)
  if (!videoId) return null

  return (
    <div className={`tv-slide ${animClass}`} onAnimationEnd={onAnimationEnd}>
      <div className="tv-thumb">
        {playing ? (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <>
            <img
              src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
              alt={video.title}
            />
            <button className="tv-play-btn" onClick={() => setPlaying(true)} aria-label="Play video">
              <svg viewBox="0 0 68 48" width="68" height="48">
                <path d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55C3.97 2.33 2.27 4.81 1.48 7.74.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z" fill="rgba(0,0,0,.7)"/>
                <path d="M45 24L27 14v20" fill="#fff"/>
              </svg>
            </button>
          </>
        )}
      </div>
      {video.title && <h4>{video.title}</h4>}
      {video.description && <p>{video.description}</p>}
    </div>
  )
}

export default function TvSection({ content, videos = [] }) {
  const c = content
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(null)
  const [animating, setAnimating] = useState(false)

  const goTo = (index, dir) => {
    if (animating || index === current) return
    setDirection(dir)
    setAnimating(true)
    setCurrent(index)
  }

  const prev = () => goTo(current > 0 ? current - 1 : videos.length - 1, 'left')
  const next = () => goTo(current < videos.length - 1 ? current + 1 : 0, 'right')

  const animClass = animating && direction
    ? direction === 'right' ? 'tv-slide-enter-left' : 'tv-slide-enter-right'
    : ''

  return (
    <section className="s s-lg" id="tv" aria-label="Телепроєкти">
      <div className="wrap-wide">
        <Reveal><div className="tag">{c.tag}</div></Reveal>
        <Reveal delay={0.1}><h2 className="h2">{c.title1}<br /><em>{c.title2}</em></h2></Reveal>
        <Reveal delay={0.2}><p className="lead">{c.lead}</p></Reveal>

        {videos.length > 0 && (
          <Reveal delay={0.3}>
            <div className="tv-carousel-wrap">
              <button className="tv-nav tv-nav-left" onClick={prev} aria-label="Previous">&#8249;</button>
              <VideoSlide
                video={videos[current]}
                animClass={animClass}
                onAnimationEnd={() => setAnimating(false)}
              />
              <button className="tv-nav tv-nav-right" onClick={next} aria-label="Next">&#8250;</button>
              <div className="tv-dots">
                {videos.map((_, i) => (
                  <button
                    key={i}
                    className={`tv-dot ${i === current ? 'active' : ''}`}
                    onClick={() => goTo(i, i > current ? 'right' : 'left')}
                    aria-label={`Video ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  )
}

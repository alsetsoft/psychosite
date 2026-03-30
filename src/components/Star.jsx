export default function Star({ size = 50, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill={color}>
      <path d="M50 0 L54 42 L100 50 L54 58 L50 100 L46 58 L0 50 L46 42 Z" />
    </svg>
  )
}

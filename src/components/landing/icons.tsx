import React from 'react'

export const PlayIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M8 5.5v13l11-6.5z" fill="currentColor" />
  </svg>
)

export const InstagramIcon: React.FC = () => (
  <svg
    viewBox="0 0 24 24"
    width="26"
    height="26"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    aria-hidden="true"
  >
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
  </svg>
)

export const FacebookIcon: React.FC = () => (
  <svg
    viewBox="0 0 24 24"
    width="26"
    height="26"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="9.5" />
    <path
      d="M13.2 20v-6.5h2.2l.3-2.5h-2.5V9.6c0-.7.2-1.2 1.3-1.2h1.3V6.2c-.3 0-1-.1-1.9-.1-1.9 0-3.1 1.1-3.1 3.2V11H8.6v2.5h2.2V20"
      fill="currentColor"
      stroke="none"
    />
  </svg>
)

export const YouTubeIcon: React.FC = () => (
  <svg
    viewBox="0 0 24 24"
    width="26"
    height="26"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="9.5" />
    <path d="M10 8.8v6.4l5.4-3.2z" fill="currentColor" stroke="none" />
  </svg>
)

export const TikTokIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
    <path
      d="M16.6 3h-3.1v12.3a2.6 2.6 0 1 1-2.6-2.6c.3 0 .5 0 .8.1V9.6a5.8 5.8 0 1 0 5 5.7V9.1a7 7 0 0 0 3.9 1.2V7.2a3.9 3.9 0 0 1-4-4.2z"
      fill="currentColor"
    />
  </svg>
)

const lineIcon = {
  viewBox: '0 0 24 24',
  width: 18,
  height: 18,
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
}

export const PhoneIcon: React.FC = () => (
  <svg {...lineIcon}>
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
  </svg>
)

export const MailIcon: React.FC = () => (
  <svg {...lineIcon}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
)

export const PinIcon: React.FC = () => (
  <svg {...lineIcon}>
    <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </svg>
)

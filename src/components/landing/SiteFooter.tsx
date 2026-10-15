import { useTranslations } from 'next-intl'
import React from 'react'

import { Link } from '@/i18n/routing'
import type { Landing } from '@/payload-types'

import { CookieSettingsButton } from './CookieConsent'
import {
  FacebookIcon,
  InstagramIcon,
  MailIcon,
  PhoneIcon,
  PinIcon,
  TikTokIcon,
  YouTubeIcon,
} from './icons'
import { NAV_LINKS } from './SiteHeader'

export const SiteFooter: React.FC<{ footer: Landing['footer'] }> = ({ footer }) => {
  const t = useTranslations('nav')
  const tContacts = useTranslations('contacts')
  const tLegal = useTranslations('legal')
  const phone = footer?.phone?.trim()
  const email = footer?.email?.trim()
  const address = footer?.address?.trim()
  const hasContacts = Boolean(phone || email || address)

  const socials = [
    { title: 'Instagram', href: footer?.instagram, Icon: InstagramIcon },
    { title: 'Facebook', href: footer?.facebook, Icon: FacebookIcon },
    { title: 'YouTube', href: footer?.youtube, Icon: YouTubeIcon },
    { title: 'TikTok', href: footer?.tiktok, Icon: TikTokIcon },
  ].filter((s) => s.href)

  return (
    <footer id="contacte" className="site-footer">
      <div className="site-footer__main">
        <Link href="/" className="brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/logo-footer.png" alt="" className="brand__logo brand__logo--multiply" />
          <span className="brand__text">
            <span className="brand__name">MOLDOVA ÎN FARFURIE</span>
            <span className="brand__by">by Chef&apos;s Forum</span>
          </span>
        </Link>
        <nav className="site-footer__links" aria-label="Footer">
          <Link href="/">{t('home')}</Link>
          {NAV_LINKS.map((link) => (
            <Link key={link.key} href={`/#${link.section}`}>
              {t(link.key)}
            </Link>
          ))}
        </nav>
        {hasContacts && (
          <address className="site-footer__contacts">
            <div className="site-footer__heading">{tContacts('title')}</div>
            {phone && (
              <a href={`tel:${phone.replace(/[^\d+]/g, '')}`} className="contact-line">
                <PhoneIcon />
                <span className="sr-only">{tContacts('phone')}: </span>
                {phone}
              </a>
            )}
            {email && (
              <a href={`mailto:${email}`} className="contact-line">
                <MailIcon />
                <span className="sr-only">{tContacts('email')}: </span>
                {email}
              </a>
            )}
            {address && (
              <div className="contact-line">
                <PinIcon />
                <span className="sr-only">{tContacts('address')}: </span>
                <span>{address}</span>
              </div>
            )}
          </address>
        )}
        <div className="site-footer__social">
          {socials.length > 0 && (
            <div className="site-footer__icons">
              {socials.map(({ title, href, Icon }) => (
                <a key={title} href={href!} title={title} target="_blank" rel="noopener noreferrer">
                  <Icon />
                </a>
              ))}
            </div>
          )}
          {footer?.hashtag && <div>{footer.hashtag}</div>}
        </div>
      </div>
      <div className="site-footer__bottom">
        <span>{footer?.copyright}</span>
        <nav className="site-footer__legal" aria-label={tLegal('privacy')}>
          <Link href="/politica-de-confidentialitate">{tLegal('privacy')}</Link>
          <Link href="/politica-cookie">{tLegal('cookies')}</Link>
          <CookieSettingsButton className="site-footer__legal-button" />
        </nav>
        {footer?.madeWith && <span>♡ {footer.madeWith}</span>}
      </div>
    </footer>
  )
}

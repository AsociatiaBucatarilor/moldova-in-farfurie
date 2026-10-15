import { useTranslations } from 'next-intl'
import React from 'react'

import type { Landing } from '@/payload-types'

import { FacebookIcon, InstagramIcon, TikTokIcon, YouTubeIcon } from './icons'
import { NAV_LINKS } from './SiteHeader'

export const SiteFooter: React.FC<{ footer: Landing['footer'] }> = ({ footer }) => {
  const t = useTranslations('nav')

  const socials = [
    { title: 'Instagram', href: footer?.instagram, Icon: InstagramIcon },
    { title: 'Facebook', href: footer?.facebook, Icon: FacebookIcon },
    { title: 'YouTube', href: footer?.youtube, Icon: YouTubeIcon },
    { title: 'TikTok', href: footer?.tiktok, Icon: TikTokIcon },
  ].filter((s) => s.href)

  return (
    <footer className="site-footer">
      <div className="site-footer__main">
        <a href="#top" className="brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/logo-footer.png" alt="" className="brand__logo brand__logo--multiply" />
          <span className="brand__text">
            <span className="brand__name">MOLDOVA ÎN FARFURIE</span>
            <span className="brand__by">by Chef&apos;s Forum</span>
          </span>
        </a>
        <nav className="site-footer__links" aria-label="Footer">
          <a href="#top">{t('home')}</a>
          {NAV_LINKS.map((link) => (
            <a key={link.key} href={link.href}>
              {t(link.key)}
            </a>
          ))}
        </nav>
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
        {footer?.madeWith && <span>♡ {footer.madeWith}</span>}
      </div>
    </footer>
  )
}

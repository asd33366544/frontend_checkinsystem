// ═══════════════════════════════════════════
//  SYNCARE — pages/HomePage.jsx
// ═══════════════════════════════════════════

import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import Button from '../components/ui/Button';
import './HomePage.css';

const HomePage = () => {
  const { isLoggedIn } = useAuth();
  const { t } = useLanguage();

  const SERVICES = [
    { emoji: '🫀', title: t('heartClinic'),         desc: t('heartDesc') },
    { emoji: '🧠', title: t('brainClinic'),        desc: t('brainDesc') },
    { emoji: '👁️',  title: t('eyeClinic'),            desc: t('eyeDesc') },
    { emoji: '🦴', title: t('bonesClinic'),        desc: t('bonesDesc') },
    { emoji: '🌸', title: t('womenClinic'),        desc: t('womenDesc') },
    { emoji: '👶', title: t('childrenClinic'),     desc: t('childrenDesc') },
  ];

  const STATS = [
    { num: '11+',  label: t('statSpecialties') },
    { num: '24/7', label: t('statOnlineBooking') },
    { num: '100%', label: t('statSecure') },
    { num: '0',    label: t('statWaitLine') },
  ];

  return (
    <div className="home">
      {/* ── Hero ── */}
      <section className="home__hero">
        <div className="home__hero-blobs" aria-hidden="true">
          <div className="home__blob--1" />
          <div className="home__blob home__blob--2" />
        </div>

        <div className="home__hero-inner">
          <div className="home__hero-content">
            <span className="home__badge">
              <span className="home__badge-dot" /> {t('badge')}
            </span>
            <h1>
              {t('heroLine1')}<br />
              <em>{t('heroLine2')}</em>
            </h1>
            <p>
              {t('heroDesc')}
            </p>
            <div className="home__hero-actions">
              {isLoggedIn ? (
                <>
                  <Link to="/appointments/book">
                    <Button variant="primary" size="lg">{t('heroBookBtn')}</Button>
                  </Link>
                  <Link to="/dashboard">
                    <Button variant="outline" size="lg">{t('heroDashBtn')}</Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/signup">
                    <Button variant="primary" size="lg">{t('heroFreeBtn')}</Button>
                  </Link>
                  <Link to="/login">
                    <Button variant="outline" size="lg">{t('heroSignInBtn')}</Button>
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="home__hero-stats">
            {STATS.map(({ num, label }) => (
              <div key={label} className="home__stat-card">
                <span className="home__stat-num">{num}</span>
                <span className="home__stat-label">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="home__services">
        <div className="home__section-header">
          <h2>{t('ourSpecialties')}</h2>
          <p>{t('specialtiesDesc')}</p>
        </div>
        <div className="home__services-grid">
          {SERVICES.map(({ emoji, title, desc }) => (
            <div key={title} className="home__service-card">
              <span className="home__service-emoji">{emoji}</span>
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="home__cta">
        <h2>{t('readyToBook')}</h2>
        <p>{t('joinThousands')}</p>
        <Link to={isLoggedIn ? '/appointments/book' : '/signup'}>
          <Button variant="primary" size="lg">
            {isLoggedIn ? t('bookNow') : t('createFreeAccount')}
          </Button>
        </Link>
      </section>

      <footer className="home__footer">
        <p>© {new Date().getFullYear()} {t('footerBuiltWithCare')}</p>
      </footer>
    </div>
  );
};

export default HomePage;

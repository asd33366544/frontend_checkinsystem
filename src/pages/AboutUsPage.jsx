// ═══════════════════════════════════════════
//  SYNCARE — pages/AboutUsPage.jsx
// ═══════════════════════════════════════════

import React from 'react';
import './AboutUsPage.css';

const TEAM_MEMBERS = Array.from({ length: 9 }, (_, i) => ({
  id: i + 1,
  name: `Team Member ${i + 1}`,
  role: 'Software Engineer',
  contribution: 'Key contribution details will be added here soon.',
  photoUrl: `https://ui-avatars.com/api/?name=Member+${i + 1}&background=random&color=fff&size=150`,
}));

const AboutUsPage = () => {
  return (
    <div className="about-page">
      <div className="about-page__header">
        <span className="about-page__tag">🚀 Our Team</span>
        <h1>About Us</h1>
        <p>Meet the brilliant minds behind SynCare. We are dedicated to making healthcare accessible and seamless.</p>
      </div>

      <div className="about-page__grid">
        {TEAM_MEMBERS.map((member) => (
          <div key={member.id} className="about-member-card">
            <div className="about-member-card__photo">
              <img src={member.photoUrl} alt={member.name} />
            </div>
            <div className="about-member-card__info">
              <h3>{member.name}</h3>
              <span className="about-member-card__role">{member.role}</span>
              <p className="about-member-card__contrib">{member.contribution}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUsPage;

import React, { useState, useCallback, Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import Map3D from '../components/graphics/map3D';
import './MapPage.css';

// Comprehensive Arabic/English mapping with floor and icons
const DEPARTMENT_INFO = {
  neurology: { ar: 'الأعصاب', en: 'Neurology', floor: 0, icon: '🧠' },
  breast: { ar: 'الثدي', en: 'Breast Surgery', floor: 0, icon: '🎗️' },
  head: { ar: 'الرأس', en: 'Head Surgery', floor: 0, icon: '🤕' },
  skinMasc1: { ar: 'الجلدية', en: 'Dermatology', floor: 0, icon: '🧴' },
  bone1: { ar: 'العظام 1', en: 'Orthopedics 1', floor: 0, icon: '🦴' },
  stomach: { ar: 'المعدة', en: 'Gastroenterology', floor: 0, icon: '🫄' },
  bone2: { ar: 'العظام 2', en: 'Orthopedics 2', floor: 0, icon: '🦴' },
  gensurg: { ar: 'الجراحة العامة', en: 'General Surgery', floor: 0, icon: '⚕️' },
  women: { ar: 'النساء', en: 'Women Health', floor: 0, icon: '👩' },
  womenEmer: { ar: 'طوارئ النساء', en: 'Women Emergency', floor: 0, icon: '🚨' },
  burnEmer: { ar: 'طوارئ الحروق', en: 'Burn Emergency', floor: 0, icon: '🔥' },
  cancer: { ar: 'الأورام', en: 'Oncology', floor: 0, icon: '♋' },
  kitchen: { ar: 'المطبخ', en: 'Kitchen', floor: 0, icon: '🍽️' },
  motawatna: { ar: 'المتوطنة', en: 'Endemic Diseases', floor: 0, icon: '🦠' },
  nasal: { ar: 'الأنف والأذن', en: 'ENT', floor: 1, icon: '👃' },
  eyes1: { ar: 'العيون 1', en: 'Ophthalmology 1', floor: 1, icon: '👁️' },
  neural2: { ar: 'الأعصاب 2', en: 'Neurology 2', floor: 1, icon: '🧠' },
  eyes2: { ar: 'العيون 2', en: 'Ophthalmology 2', floor: 1, icon: '👁️' },
  pathology2: { ar: 'الباثولوجي 2', en: 'Pathology 2', floor: 1, icon: '🔬' },
  eyes3: { ar: 'العيون 3', en: 'Ophthalmology 3', floor: 1, icon: '👁️' },
  scopies: { ar: 'المناظير', en: 'Endoscopy', floor: 1, icon: '🩻' },
  surgeries: { ar: 'الجراحات', en: 'Surgeries', floor: 1, icon: '🔪' },
  bone3: { ar: 'العظام 3', en: 'Orthopedics 3', floor: 1, icon: '🦴' },
  masalek: { ar: 'المسالك', en: 'Urology', floor: 1, icon: '💧' },
  bone4: { ar: 'العظام 4', en: 'Orthopedics 4', floor: 1, icon: '🦴' },
  stomach2: { ar: 'المعدة 2', en: 'Gastro 2', floor: 1, icon: '🫄' },
  womenSurg: { ar: 'جراحة النساء', en: 'Women Surgery', floor: 1, icon: '⚕️' },
  heartSurg: { ar: 'جراحة القلب', en: 'Heart Surgery', floor: 2, icon: '🫀' },
  heart: { ar: 'القلب', en: 'Cardiology', floor: 2, icon: '❤️' },
  brain: { ar: 'المخ', en: 'Brain Surgery', floor: 2, icon: '🧠' },
  genSurg2: { ar: 'جراحة عامة 2', en: 'General Surg 2', floor: 2, icon: '⚕️' },
  pathology3: { ar: 'الباثولوجي 3', en: 'Pathology 3', floor: 2, icon: '🔬' },
  genSurg3: { ar: 'جراحة عامة 3', en: 'General Surg 3', floor: 2, icon: '⚕️' },
  surgeries2: { ar: 'الجراحات 2', en: 'Surgeries 2', floor: 2, icon: '🔪' },
  intestines: { ar: 'الأمعاء', en: 'Intestines', floor: 2, icon: '🧬' },
  beauty: { ar: 'التجميل', en: 'Cosmetic Surgery', floor: 2, icon: '✨' },
  stomach3: { ar: 'المعدة 3', en: 'Gastro 3', floor: 2, icon: '🫄' },
  genSurg4: { ar: 'جراحة عامة 4', en: 'General Surg 4', floor: 2, icon: '⚕️' },
  womenSurg2: { ar: 'جراحة نساء 2', en: 'Women Surg 2', floor: 2, icon: '⚕️' },
  womenSurg3: { ar: 'جراحة نساء 3', en: 'Women Surg 3', floor: 2, icon: '⚕️' },
};

const getDeptInfo = (deptId) => {
  return DEPARTMENT_INFO[deptId] || {
    ar: deptId,
    en: deptId.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
    floor: 0,
    icon: '🏥'
  };
};

export default function MapPage() {
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [availableDepartments, setAvailableDepartments] = useState([]);
  const [activeFloor, setActiveFloor] = useState(0);

  const handleNodesLoaded = useCallback((nodes) => {
    setAvailableDepartments(nodes);
  }, []);

  // Filter departments by active floor
  const filteredDepartments = useMemo(() => {
    return availableDepartments.filter(deptId => getDeptInfo(deptId).floor === activeFloor);
  }, [availableDepartments, activeFloor]);

  const selectedInfo = selectedDepartment ? getDeptInfo(selectedDepartment) : null;

  return (
    <div className="map-page-container">
      <div className="canvas-container">
        <Suspense fallback={
          <div className="cyber-loading">
            <div className="loading-spinner"></div>
            <div>INITIALIZING MAP...</div>
          </div>
        }>
          <Canvas camera={{ position: [0, 4, 8], fov: 50 }}>
            <Map3D
              selectedDepartment={selectedDepartment}
              onNodesLoaded={handleNodesLoaded}
            />
          </Canvas>
        </Suspense>
      </div>

      {/* Cyberpunk Sidebar */}
      <div className="cyber-sidebar">
        <div className="cyber-header">
          <h2 className="cyber-title-en">Hospital Map</h2>
          <h2 className="cyber-title-ar">خريطة المستشفى</h2>
        </div>

        <div className="floor-selector">
          {[0, 1, 2].map(floor => (
            <button
              key={floor}
              className={`floor-btn ${activeFloor === floor ? 'active' : ''}`}
              onClick={() => {
                setActiveFloor(floor);
                setSelectedDepartment(''); // reset selection on floor change
              }}
            >
              Floor {floor}
            </button>
          ))}
        </div>

        <div className="dept-list">
          {filteredDepartments.length === 0 ? (
            <div style={{ padding: '20px', textAlign: 'center', color: '#888' }}>
              Loading departments...
            </div>
          ) : (
            filteredDepartments.map((dept) => {
              const info = getDeptInfo(dept);
              return (
                <div
                  key={dept}
                  className={`dept-card ${selectedDepartment === dept ? 'active' : ''}`}
                  onClick={() => setSelectedDepartment(selectedDepartment === dept ? '' : dept)}
                >
                  <div className="dept-icon">{info.icon}</div>
                  <div className="dept-info">
                    <span className="dept-name-en">{info.en}</span>
                    <span className="dept-name-ar">{info.ar}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* AI Navigation Assistant Widget */}
      <div className="ai-assistant">
        <div className="ai-avatar">🤖</div>
        <div className="ai-msg">
          {selectedDepartment
            ? `Navigating to ${selectedInfo?.en}...`
            : 'Select a department to navigate'}
        </div>
      </div>

      {/* Floating Info Card */}
      {selectedInfo && (
        <div className="floating-info-card">
          <div className="info-header">
            <div className="dept-icon" style={{ fontSize: '2rem' }}>{selectedInfo.icon}</div>
            <div className="info-status">Target Acquired</div>
          </div>
          <div className="info-title">
            <h3>{selectedInfo.en}</h3>
            <p>{selectedInfo.ar}</p>
          </div>
          <div className="info-details">
            <div className="detail-row">
              <span className="detail-label">Floor Level</span>
              <span className="detail-value">Level {selectedInfo.floor}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Est. Walking Time</span>
              <span className="detail-value">{Math.floor(Math.random() * 4) + 2} mins</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Path Status</span>
              <span className="detail-value" style={{ color: '#00ff00' }}>Clear</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

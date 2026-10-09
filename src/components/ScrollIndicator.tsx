import React from 'react';

interface Section {
  id: string;
  name: string;
}

interface ScrollIndicatorProps {
  sections: Section[];
  currentSection: number;
  onSectionClick: (index: number) => void;
}

const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({
  sections,
  currentSection,
  onSectionClick
}) => {
  return (
    <div className="auto-scroll-indicator">
      {sections.map((section, index) => (
        <div
          key={section.id}
          className={`scroll-dot ${index === currentSection ? 'active' : ''}`}
          onClick={() => onSectionClick(index)}
          title={section.name}
        />
      ))}
    </div>
  );
};

export default ScrollIndicator;
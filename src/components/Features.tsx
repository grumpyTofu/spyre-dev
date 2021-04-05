import React from 'react';
import PreviewCompatibleImage from './PreviewCompatibleImage';

interface GridItem {
  image: string | any; // was PropTypes.object
  text: string;
}

interface FeaturesProps {
  gridItems: GridItem[];
}

const FeatureGrid: React.FC<FeaturesProps> = ({ gridItems }) => (
  <div className="columns is-multiline">
    {gridItems.map(item => (
      <div key={item.text} className="column is-6">
        <section className="section">
          <div className="has-text-centered">
            <div
              style={{
                width: '240px',
                display: 'inline-block',
              }}
            >
              <PreviewCompatibleImage imageInfo={item} />
            </div>
          </div>
          <p>{item.text}</p>
        </section>
      </div>
    ))}
  </div>
);

export default FeatureGrid;

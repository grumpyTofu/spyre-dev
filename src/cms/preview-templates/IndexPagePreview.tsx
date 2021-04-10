import React from 'react';
import { IndexPageTemplate } from '../../templates/index-page';
import { PreviewTemplateComponentProps } from 'netlify-cms-core';

const IndexPagePreview: React.FC<PreviewTemplateComponentProps> = ({
  entry,
  getAsset,
}) => {
  const data = entry.getIn(['data']).toJS();

  if (data) {
    return (
      <IndexPageTemplate
        image={getAsset(data.image)}
        title={data.title}
        heading={data.heading}
        subheading={data.subheading}
        description={data.description}
        intro={data.intro || { blurbs: [] }}
        mainpitch={data.mainpitch || {}}
        isPreview={true}
      />
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default IndexPagePreview;

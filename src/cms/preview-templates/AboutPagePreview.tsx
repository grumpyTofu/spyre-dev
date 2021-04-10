import React from 'react';
import { PreviewTemplateComponentProps } from 'netlify-cms-core';
import { AboutPageTemplate } from '../../templates/about-page';

const AboutPagePreview: React.FC<PreviewTemplateComponentProps> = ({
  entry,
  widgetFor,
}) => (
  <AboutPageTemplate
    title={entry.getIn(['data', 'title'])}
    content={(widgetFor('body') as unknown) as string}
  />
);

export default AboutPagePreview;

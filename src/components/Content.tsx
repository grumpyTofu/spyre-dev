import React from 'react';

interface ContentProps {
  content: any; // was PropTypes.node
  className: string;
}

export const HTMLContent: React.FC<ContentProps> = ({ content, className }) => (
  <div className={className} dangerouslySetInnerHTML={{ __html: content }} />
);

const Content: React.FC<ContentProps> = ({ content, className }) => (
  <div className={className}>{content}</div>
);

export default Content;

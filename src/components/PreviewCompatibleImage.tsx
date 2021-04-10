import React from 'react';
import Img from 'gatsby-image';
import { MarkdownRemarkFrontmatterIntroBlurbs } from '../../graphql-types';

interface ImageInfo extends MarkdownRemarkFrontmatterIntroBlurbs {
  alt?: string;
  childImageSharp?: any; // was PropTypes.object
  style?: any; // was PropTypes.object
}
interface PreviewCompatibleImageProps {
  imageInfo: ImageInfo;
}

const PreviewCompatibleImage: React.FC<PreviewCompatibleImageProps> = ({
  imageInfo,
}) => {
  const imageStyle = { borderRadius: '5px' };
  const { alt = '', childImageSharp, image } = imageInfo;

  if (!!image && !!image.childImageSharp) {
    return (
      <Img style={imageStyle} fluid={image.childImageSharp.fluid} alt={alt} />
    );
  }

  if (!!childImageSharp) {
    return <Img style={imageStyle} fluid={childImageSharp.fluid} alt={alt} />;
  }

  if (!!image && typeof image === 'string')
    return <img style={imageStyle} src={image} alt={alt} />;

  return null;
};

export default PreviewCompatibleImage;

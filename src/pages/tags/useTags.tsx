import { useStaticQuery, graphql } from 'gatsby';
import { TagsQuery } from '../../../graphql-types';


export const useTags = () => {
  const data = useStaticQuery<TagsQuery>(tagsPageQuery);
  return { group: data.allMarkdownRemark.group, title: data.site.siteMetadata.title };
};

const tagsPageQuery = graphql`
  query Tags {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 1000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;

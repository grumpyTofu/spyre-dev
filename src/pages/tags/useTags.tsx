import { useStaticQuery, graphql } from 'gatsby';

interface TagData {
  allMarkdownRemark: { 
      group: string | any;
    };
  site: {
    siteMetadata: { 
        title: string;
    };
  };
}

export const useTags = () => {
  const data = useStaticQuery<TagData>(tagPageQuery);
  return { group: data.allMarkdownRemark.group, title: data.site.siteMetadata.title };
};

const tagPageQuery = graphql`
  query TagsQuery {
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

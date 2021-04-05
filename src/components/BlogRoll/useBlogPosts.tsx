import { useStaticQuery, graphql } from 'gatsby';

interface BlogRollData {
  allMarkdownRemark: {
    edges: any[];
  };
}

export const useBlogPosts = () => {
  const data = useStaticQuery<BlogRollData>(BlogRollDataQuery);
  return data.allMarkdownRemark.edges;
};

const BlogRollDataQuery = graphql`
  query BlogRollQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
    ) {
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          fields {
            slug
          }
          frontmatter {
            title
            templateKey
            date(formatString: "MMMM DD, YYYY")
            featuredpost
            featuredimage {
              childImageSharp {
                fluid(maxWidth: 120, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`;

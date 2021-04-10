import { useStaticQuery, graphql } from 'gatsby';
import { BlogRollQuery } from '../../../graphql-types';

export const useBlogPosts = () => {
  const data = useStaticQuery<BlogRollQuery>(BlogRollDataQuery);
  return data.allMarkdownRemark.edges;
};

const BlogRollDataQuery = graphql`
  query BlogRoll {
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

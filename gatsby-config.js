module.exports = {
  siteMetadata: {
    title: 'Spyre Development',
    description:
      'Welcome to Spyre Development where we seek to optimize your business operations through utilizing modern technologies.',
  },
  plugins: [
    // {
    //   resolve: `gatsby-plugin-material-ui`,
    //   options: {
    //     stylesProvider: {
    //       injectFirst: true,
    //     },
    //   },
    // },
    'gatsby-plugin-material-ui',
    'gatsby-plugin-typescript',
    // {
    //   resolve: `gatsby-plugin-typescript`,
    //   options: {
    //     // isTSX: true, // defaults to false
    //     // jsxPragma: `jsx`, // defaults to "React"
    //     // allExtensions: true, // defaults to false
    //     // allowJS: true,
    //   },
    // },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    // {
    //   resolve: 'gatsby-plugin-sass',
    //   options: {
    //       indentedSyntax: true
    //   },
    // },
    // Add static assets before markdown files
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static/img`,
        name: 'uploads',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/img`,
        name: 'images',
      },
    },
    // {
    //   // keep as first gatsby-source-filesystem plugin for gatsby image support
    //   resolve: 'gatsby-source-filesystem',
    //   options: {
    //     path: `${__dirname}/static/img`,
    //     name: 'uploads',
    //   },
    // },
    // {
    //   resolve: 'gatsby-source-filesystem',
    //   options: {
    //     path: `${__dirname}/src/pages`,
    //     name: 'pages',
    //   },
    // },
    // {
    //   resolve: 'gatsby-source-filesystem',
    //   options: {
    //     path: `${__dirname}/src/img`,
    //     name: 'images',
    //   },
    // },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-relative-images',
            options: {
              name: 'uploads',
            },
          },
          {
            resolve: `gatsby-transformer-remark`,
            options: {
              plugins: [
                // gatsby-remark-relative-images must go before gatsby-remark-images
                {
                  resolve: `gatsby-remark-relative-images`,
                  options: {
                    // [Optional] The root of "media_folder" in your config.yml
                    // Defaults to "static"
                    staticFolderName: 'static',
                    // [Optional] Include the following fields, use dot notation for nested fields
                    // All fields are included by default
                    include: ['featured'],
                    // [Optional] Exclude the following fields, use dot notation for nested fields
                    // No fields are excluded by default
                    exclude: ['featured.skip'],
                  },
                },
                {
                  resolve: `gatsby-remark-images`,
                  options: { maxWidth: 1024 },
                },
              ],
            },
          },
          // {
          //   resolve: 'gatsby-remark-images',
          //   options: {
          //     // It's important to specify the maxWidth (in pixels) of
          //     // the content container as this plugin uses this as the
          //     // base for generating different widths of each image.
          //     maxWidth: 2048,
          //   },
          // },
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: {
              destinationDir: 'static',
            },
          },
        ],
      },
    },
    'gatsby-plugin-netlify-cms',
    {
      resolve: `gatsby-plugin-netlify-cms`,
      options: {
        // One convention is to place your Netlify CMS customization code in a
        // `src/cms` directory.
        modulePath: `${__dirname}/src/cms/cms.ts`,
        //stylesPath: `${__dirname}/src/components/all.sass`,
      },
    },
    {
      resolve: 'gatsby-plugin-purgecss', // purges all unused/unreferenced css rules
      options: {
        develop: true, // Activates purging in npm run develop
        purgeOnly: ['/all.sass'], // applies purging only on the bulma css file
      },
    }, // must be after other CSS plugins
    {
      resolve: `gatsby-plugin-graphql-codegen`,
      options: {
        documentPaths: [
          './src/**/*.{ts,tsx}',
          './.cache/fragments/*.js',
          './node_modules/gatsby-*/**/*.js',
          './node_modules/**/fragments.js',
          //'./gatsby-node.ts',
        ],
      },
    },
    'gatsby-plugin-netlify', // make sure to keep it last in the array
  ],
};

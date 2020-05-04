module.exports = {
  siteMetadata: {
    title: 'arenarolodex',
    url: 'arena.lowellhs.com'
  },
  require("dotenv").config({
    path: `.env.${process.env.NODE_ENV}`,
  }),
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        display: 'minimal-ui',
        icon: 'src/images/gatsby-icon.png',
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-130516556-1',
        head: true,
      }
    }
  ],
}

const _ = require("lodash")
const Promise = require("bluebird")
const path = require("path")
const { createFilePath } = require("gatsby-source-filesystem")
const { supportedGrades } = require("./i18n")

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve("./src/templates/blog-post.js")
    const topicTemplate = path.resolve("src/templates/topics.js")
    const gameTemplate = path.resolve("src/templates/game-question.js")

    // Create index pages for all supported languages
    Object.keys(supportedGrades).forEach(langKey => {
      createPage({
        path: langKey === "all" ? "/" : `/${langKey}/`,
        component: path.resolve("./src/templates/blog-index.js"),
        context: {
          langKey,
        },
      })
    })

    resolve(
      graphql(
        `
          {
            allMarkdownRemark(
              sort: { fields: [frontmatter___date], order: DESC }
              limit: 1000
            ) {
              edges {
                node {
                  fields {
                    slug
                    langKey
                    directoryName
                  }
                  frontmatter {
                    title
                    topics
                  }
                }
              }
            }
            topicsGroup: allMarkdownRemark(limit: 2000) {
              group(field: frontmatter___topics) {
                fieldValue
              }
            }
            allJuegosJson {
              edges {
                node {
                  question {
                    intro
                    name
                  }
                  topic
                  grade
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
          return
        }

        // Create blog posts pages.
        const posts = result.data.allMarkdownRemark.edges
        const allSlugs = _.reduce(
          posts,
          (result, post) => {
            result.add(post.node.fields.slug)
            return result
          },
          new Set()
        )

        const gradesByDirectory = _.reduce(
          posts,
          (result, post) => {
            const directoryName = _.get(post, "node.fields.directoryName")
            const langKey = _.get(post, "node.fields.langKey")

            if (directoryName && langKey) {
              ;(result[directoryName] || (result[directoryName] = [])).push(
                langKey
              )
            }

            return result
          },
          {}
        )

        const defaultLangPosts = posts.filter(
          ({ node }) => node.fields.langKey === "all"
        )
        _.each(defaultLangPosts, (post, index) => {
          const previous =
            index === defaultLangPosts.length - 1
              ? null
              : defaultLangPosts[index + 1].node
          const next = index === 0 ? null : defaultLangPosts[index - 1].node

          const translations =
            gradesByDirectory[_.get(post, "node.fields.directoryName")] || []

          createPage({
            path: post.node.fields.slug,
            component: blogPost,
            context: {
              slug: post.node.fields.slug,
              previous,
              next,
              translations,
              translatedLinks: [],
            },
          })

          // Extract topic data from query
          const topics = result.data.topicsGroup.group
          // Make topic pages
          topics.forEach(topic => {
            createPage({
              path: `/temas/${_.kebabCase(topic.fieldValue)}/`,
              component: topicTemplate,
              context: {
                topic: topic.fieldValue,
              },
            })
          })

          // Extract game data from query
          const games = result.data.allJuegosJson.edges

          games.forEach(game => {
            const { topic, grade } = game.node
            createPage({
              path: `/juegos/${_.kebabCase(topic)}/${_.kebabCase(grade)}/`,
              component: gameTemplate,
              context: {
                topic: _.kebabCase(topic),
                grade: _.kebabCase(grade),
              },
            })
          })

          const otherLangPosts = posts.filter(
            ({ node }) => node.fields.langKey !== "all"
          )
          _.each(otherLangPosts, post => {
            const translations =
              gradesByDirectory[_.get(post, "node.fields.directoryName")]

            // Record which links to internal posts have translated versions
            // into this language. We'll replace them before rendering HTML.
            let translatedLinks = []

            createPage({
              path: post.node.fields.slug,
              component: blogPost,
              context: {
                slug: post.node.fields.slug,
                translations,
                translatedLinks,
              },
            })
          })
        })
      })
    )
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `directoryName`,
      node,
      value: path.basename(path.dirname(_.get(node, "fileAbsolutePath"))),
    })
  }
}

import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import styles from "./tags.module.scss"
import { graphql } from "gatsby"
import PostList from "../components/postList"

const Tags = ({ pageContext, data }) => {
  const { tag } = pageContext
  const { edges, totalCount } = data.allMdx
  const tagHeader = `${totalCount} post${totalCount === 1 ? "" : "s"
    } tagged with "${tag}"`

  return (
    <Layout>
      <SEO title={`All posts tagged as "${tag}"`} description={`All ${tag} posts.`} />
      <main className={styles.main} role="main">
        <div className={styles.container}>
          <h1 className={styles.description}>{tagHeader}</h1>
          <ul className={styles.list}>
            {edges.map(({ node }) => {
              const { id, frontmatter, timeToRead, fields } = node
              const { title } = frontmatter
              return (
                <PostList
                  key={id}
                  title={title}
                  time={timeToRead}
                  slug={fields.slug.name}
                />
              )
            })}
          </ul>
        </div>
      </main>
    </Layout>
  )
}

export default Tags

export const pageQuery = graphql`
  query($tag: String!) {
    allMdx(
      sort: { fields: [frontmatter___dateUpdated], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
          }
          fields {
            slug {
              name
            }
          }
          timeToRead
        }
      }
    }
  }
`

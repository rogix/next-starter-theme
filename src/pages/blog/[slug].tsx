import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'

import { Header } from '../../components/Header'
import { Box, Container, Heading } from '@chakra-ui/react'

import type { Frontmatter } from '../../types/frontmatter'
import CodeBlock from '../../../lib/codeBlock'

type Props = {
  params: Frontmatter
  frontMatter: Frontmatter['frontMatter']
  mdxSource: MDXRemoteSerializeResult
}

const components = {
  pre: props => <div {...props} />,
  code: CodeBlock,
}

export const getStaticPaths = async () => {
  const files = fs.readdirSync(path.join('posts'))

  const paths = files.map(filename => ({
    params: {
      slug: filename.replace('.mdx', ''),
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async ({ params: { slug } }: Props) => {
  const markdownWithMeta = fs.readFileSync(
    path.join('posts', slug + '.mdx'),
    'utf-8',
  )
  const { data: frontMatter, content } = matter(markdownWithMeta)
  const mdxSource = await serialize(content)
  return {
    props: {
      frontMatter,
      slug,
      mdxSource,
    },
  }
}

const BlogPost = ({ frontMatter: { title }, mdxSource }: Props) => {
  return (
    <Box>
      <Header />
      <Container maxW="container.md" mt="20">
        <Heading>{title}</Heading>
        <MDXRemote {...mdxSource} components={components} />
      </Container>
    </Box>
  )
}

export default BlogPost

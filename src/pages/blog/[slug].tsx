import { useMemo } from 'react'
import { getMDXComponent } from 'mdx-bundler/client'

import { Header } from '../../components/Header'
import { Box, Container, Heading } from '@chakra-ui/react'

import type { Frontmatter } from '../../types/frontmatter'
import { getAllFrontmatter, getMdxBySlug } from '../../../lib/mdx'
import { components } from '../../components/MDXComponents'

type Props = {
  params: Frontmatter
  frontmatter: Frontmatter
  code: any
}

const BlogPost = ({ frontmatter, code }: Props) => {
  const Component = useMemo(() => getMDXComponent(code), [code])

  return (
    <Box>
      <Header />
      <Container maxW="container.md" mt="20">
        <Heading as="h1" mb="6">
          {frontmatter.title}
        </Heading>
        <Component components={components as any} />
      </Container>
    </Box>
  )
}

export const getStaticPaths = async () => {
  const frontmatters = getAllFrontmatter('blog')

  return {
    paths: frontmatters.map(({ slug }) => ({ params: { slug } })),
    fallback: false,
  }
}

export const getStaticProps = async (context: { params: { slug: string } }) => {
  const { frontmatter, code } = await getMdxBySlug('blog', context.params.slug)

  return {
    props: {
      frontmatter,
      code,
    },
  }
}

export default BlogPost

import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Img from "gatsby-image"
import VisibilitySensor from "react-visibility-sensor"

import config from "../../config"

import Theme from "../../styles/Theme"
import ContentWrapper from "../../styles/ContentWrapper"
import Underlining from "../../styles/Underlining"
import Button from "../../styles/Button"

import IconGithub from "../icons/github"

const { socialMedia } = config
const { colors, borderRadius, breakpoints } = Theme

const StyledSection = styled.section`
  width: 100%;
  height: auto;
  background: ${colors.background};
  margin-top: 6rem;
`

const StyledContentWrapper = styled(ContentWrapper)`
  && {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-right: 0;
    padding-left: 0;
    @media (min-width: ${breakpoints.lg}) {
      padding-right: 2.5rem;
      padding-left: 2.5rem;
    }
  }
`

const StyledSectionTitle = styled.h3`
  padding-right: 2.5rem;
  padding-left: 2.5rem;
  @media (min-width: ${breakpoints.lg}) {
    padding-right: 0;
    padding-left: 0;
  }
`

const StyledProjects = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: -2.5rem;
  padding: 2.5rem 2.5rem;
  overflow-x: scroll;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar {
    display: none;
  }
  @media (min-width: ${breakpoints.lg}) {
    flex-direction: column;
    margin-top: 0;
    padding: 0;
    overflow: visible;
  }
`

const StyledProjectsCounter = styled.div`
  position: absolute;
  top: 2.2rem;
  right: 2.5rem;
  font-size: 1.125rem;
  font-weight: 500;
  @media (min-width: ${breakpoints.sm}) {
    display: none;
  }
`

const StyledProject = styled.div`
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10rem;
  flex-shrink: 0;
  padding-right: 2.5rem;
  max-width: 20rem;
  @media (min-width: ${breakpoints.xs}) {
    max-width: 25rem;
    padding-right: 5rem;
  }
  @media (min-width: ${breakpoints.lg}) {
    flex-shrink: 1;
    max-width: 62.5rem;
    padding-right: 0;
    // Positioning of image and details should vary
    flex-direction: ${({ position }) =>
      position % 2 !== 0 ? "row" : "row-reverse"};
  }
`

const StyledDetails = styled.div`
  width: 100%;
  max-width: 25rem;
  display: flex;
  flex-direction: column;
  margin-top: 3rem;
`

const StyledCategory = styled.div`
  font-size: 0.875rem;
  line-height: 1rem;
  text-transform: uppercase;
  letter-spacing: +1px;
`

const StyledTitle = styled.h4`
  margin-top: 0.625rem;
  margin-bottom: 0.625rem;
  font-size: 1.375rem;
  line-height: 1.625rem;
  font-weight: 700;
`

const StyledLabelWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 1.5rem;
  line-height: 1.2rem;
  span {
    margin-right: 1rem;
    margin-bottom: 1rem;
  }
`

const StyledImg = styled(Img)`
  width: 100%;
  max-width: 25rem;
  border-radius: ${borderRadius};
  box-shadow: 0 0 2.5rem rgba(0, 0, 0, 0.16);
  transition: all 0.3s ease-out;
  &:hover {
    transform: translate3d(0px, -0.125rem, 0px);
    box-shadow: 0 0 2.5rem rgba(0, 0, 0, 0.32);
  }
`

const StyledLink = styled.a`
  margin: -6rem auto 2rem auto;
  @media (min-width: ${breakpoints.lg}) {
    margin: 0 auto;
  }
`

const Projects = ({ content }) => {
  const sectionDetails = content[0].node
  const projects = content.slice(1, content.length)

  // visibleProject is needed to show which project is currently
  // being viewed in the horizontal slider on mobile and tablet
  const [visibleProject, setVisibleProject] = useState(1)

  // set first project as the visible one after component did mount
  useEffect(() => setVisibleProject(1), [])

  return (
    <StyledSection id="projects">
      <StyledContentWrapper>
        <StyledSectionTitle>
          {sectionDetails.frontmatter.title}
        </StyledSectionTitle>
        <StyledProjectsCounter>
          {visibleProject} / {projects.length}
        </StyledProjectsCounter>
        <StyledProjects>
          {projects.map(project => {
            const { body, frontmatter } = project.node
            return (
              <StyledProject position={frontmatter.position} key={frontmatter.position}>
                <StyledDetails position={frontmatter.position}>
                  <StyledCategory>
                    {frontmatter.emoji} {frontmatter.category}
                  </StyledCategory>
                  <StyledTitle>{frontmatter.title}</StyledTitle>
                  <MDXRenderer>{body}</MDXRenderer>
                  <StyledLabelWrapper>
                    {frontmatter.tags.map(tag => (
                      <Underlining key={tag}
                        color={colors.secondary}
                        hoverColor={colors.secondary}>
                        {tag}
                      </Underlining>
                    ))}
                  </StyledLabelWrapper>
                </StyledDetails>
                {/* If image in viewport changes, update state accordingly */}
                <VisibilitySensor onChange={() => setVisibleProject(frontmatter.position)}>
                  <StyledImg fluid={frontmatter.screenshot.childImageSharp.fluid} />
                </VisibilitySensor>
              </StyledProject>
            )
          })}
        </StyledProjects>
        <StyledLink
          href={socialMedia.filter(profile => profile.name === "Github")[0].url}
          target="_blank"
          rel="nofollow noopener noreferrer"
          aria-label="External Link"
        >
          <Button
            type="button"
            textAlign="center"
            color={colors.primary}
            center
          >
            <IconGithub color="#ffffff" /> See More On Github
          </Button>
        </StyledLink>
      </StyledContentWrapper>
    </StyledSection>
  )
}

export default Projects

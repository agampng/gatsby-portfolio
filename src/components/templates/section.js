
// SECTION TEMPLATE
// If you want to add more sections to your page, you can use this component as a template

import React from "react"
import styled from "styled-components"

import Theme from "../styles/Theme"
import ContentWrapper from "../styles/ContentWrapper"

// Use Theme Variables
const { colors } = Theme

// Full Width Section
const StyledSection = styled.section`
  width: 100%;
  height: auto;
  background: ${colors.background};
  margin-top: 6rem;
`

// Fixed width container for content stuff
const StyledContentWrapper = styled(ContentWrapper)`
  && {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`

// Add more styled components here

const ___Section___ = ({ content }) => {

  // Extract GraphQL data here  
  const sectionDetails = content[0].node

  return (
    <StyledSection id="___SectionHashId___">
      <StyledContentWrapper>
        <h3>___SectionTitle___</h3>
        {/* ____SectionContent____ */}
      </StyledContentWrapper>
    </StyledSection>
  )
}

export default ___Section___

import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

import Config from "../config/"

import Theme from "../styles/Theme"
import ContentWrapper from "../styles/ContentWrapper"

import Logo from "./logo"

const { footerLinks } = Config
const { colors, breakpoints, footerHeight } = Theme

const StyledFooter = styled.footer`
  width: 100%;
  height: ${footerHeight};
  background: ${colors.primary};
  margin-top: 10rem;
`

const StyledContentWrapper = styled(ContentWrapper)`
  && {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`

const StyledLinksWrapper = styled.div`
  // Adjust width of links wrapper accordingly
  width: 10rem;
  display: flex;
  justify-content: space-between;
  @media (min-width: ${breakpoints.sm}) {
    width: 15rem;
  }
`

const StyledLegalLink = styled(Link)`
  font-size: 0.875rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #ffffff;
  letter-spacing: 1px;
`

const Footer = () => (
  <StyledFooter>
    <StyledContentWrapper>
      <Link to="/" aria-label="home">
        <Logo color="white" size="1.5rem" />
      </Link>
      <StyledLinksWrapper>
        {footerLinks.map(({ name, url }, key) => (
          <StyledLegalLink key={key} to={url}>{name}</StyledLegalLink>
        ))}
      </StyledLinksWrapper>
    </StyledContentWrapper>
  </StyledFooter>
)

export default Footer

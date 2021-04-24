import React from 'react'
import styled from 'styled-components'
import { Heading, Image, Text } from 'soups-lottery-uikit'
import useI18n from 'hooks/useI18n'
import Container from 'components/layout/Container'
import LotteryProgress from './LotteryProgress'

const Title = styled(Heading).attrs({ as: 'h1', size: 'xxl' })`
  color: #EF4136;
  margin-bottom: 24px;
  text-align: center;
`

const Blurb = styled(Text)`
  color: #ffffff;
  font-size: 20px;
  font-weight: 600;
  text-align: center;
`

const StyledHero = styled.div`
  background-image: linear-gradient(0deg, #ffd076 0%, #fec64f 100%);
  padding-bottom: 40px;
  padding-top: 40px;
`

const StyledContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`

const Wrapper = styled.div`
  flex: 1;
`

const RightWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0;
  margin-top: 16px;


`
const ImageTitle = styled(Image)`
  flex: 1;
`

const Hero = () => {
  const TranslateString = useI18n()

  return (
    <StyledHero>
      <StyledContainer>
        <Wrapper>
          <RightWrapper>
           <ImageTitle src="/images/SOUP-new.svg" width={150} height={150}  />
          </RightWrapper>
          <Title>{TranslateString(708, 'The SOUP Lottery')}</Title>
          <Blurb>{TranslateString(710, 'Buy tickets with SOUP')}</Blurb>
          <Blurb>{TranslateString(712, 'Win if 2, 3, or 4 of your ticket numbers match!')}</Blurb>
        </Wrapper>
      </StyledContainer>
    </StyledHero>
  )
}

export default Hero

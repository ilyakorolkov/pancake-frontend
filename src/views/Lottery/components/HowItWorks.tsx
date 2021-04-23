import React from 'react'
import styled from 'styled-components'
import { Text, Heading, Link, Image } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'

const LayoutWrapper = styled.div`
  max-width: 500px;
  margin: 0 auto 40px;
  display: flex;
  flex-direction: column;
`

const StyledHeading = styled(Heading)`
  margin: 16px 0;
  color: ${(props) => props.theme.colors.secondary};
`

const StyledImage = styled(Image)`
  align-self: center;
`

const StyledLink = styled(Link)`
  align-self: center;
  margin-top: 16px;
`

const TextPar = styled(Text)`
    white-space: pre-line;
`

const HowItWorks = () => {
  const TranslateString = useI18n()

  return (
    <LayoutWrapper>
      <StyledImage src="/images/soup-pot.gif" alt="lottery bunny" width={300} height={280} />
      <StyledHeading size="lg" as="h3">
        {TranslateString(632, 'How it works')}
      </StyledHeading>
      <Text fontSize="16px">
        {TranslateString(
          426,
          'Spend SOUP to buy tickets, contributing to the lottery pot. Win prizes if 2, 3, or 4 of your ticket numbers match the winning numbers and their exact order! ',
        )}
      </Text>

      <StyledHeading size="lg" as="h3">
        {TranslateString(632, 'How to win')}
      </StyledHeading>
      <Text fontSize="16px">
        {TranslateString(
          426,
          'To win the lottery jackpot (50% of the entire lottery pool), users need to match all 4 numbers on their ticket in the exact same order as the 4 winning numbers.\n' +
          'If you don’t match all 4, no need to worry. As long as you match 2 or more numbers in the correct order, you are guaranteed to win a prize. ',
        )}
      </Text>

      <StyledHeading size="lg" as="h3">
        {TranslateString(632, 'Pot allocation:')}
      </StyledHeading>
      <TextPar fontSize="16px">
          {'• Match all 4 numbers in the exact order = win 50% of the pot (or split the pot if more than 1 winner). \n• Match 3 numbers in the exact order = win or split 20% of the pot. \n• Match 2 numbers in the exact order = win or split 10% of the pot. \n• At least 20% of the pot carried forward to next round. '}
      </TextPar>

      <StyledLink href="https://bscscan.com/address/">{TranslateString(610, 'Contract on BSCScan')}</StyledLink>
    </LayoutWrapper>
  )
}

export default HowItWorks

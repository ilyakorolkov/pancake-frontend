import React from 'react'
import styled from 'styled-components'
import { Flex, Heading, Image, Text } from 'soups-lottery-uikit'

interface HeadingProps {
  valueToDisplay?: string
  children?: string
  Icon?: string
}

const IconWrapper = styled.div`
  margin-right: 16px;
  
    width: 48px;
    height: 48px;
  
`

const LotteryCardHeading: React.FC<HeadingProps> = ({ valueToDisplay, children, Icon, ...props }) => {
  return (
    <Flex {...props}>
      {Icon && (
        <IconWrapper>
          <Image src={Icon} alt="Number 1" width={100} height={100} responsive />
        </IconWrapper>
      )}
      <Flex flexDirection="column">
        <Text fontSize="14px" color="textSubtle">
          {children}
        </Text>
        <Heading size="lg">{valueToDisplay}</Heading>
      </Flex>
    </Flex>
  )
}

LotteryCardHeading.defaultProps = {
  valueToDisplay: '',
  Icon: "/images/SOUP-new.svg" ,
  children: '',
}

export default LotteryCardHeading

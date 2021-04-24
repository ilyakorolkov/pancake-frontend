import React from 'react'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import { Card, CardBody, Image } from 'soups-lottery-uikit'
import { useMatchingRewardLength, useWinningNumbers } from 'hooks/useTickets'
import useI18n from 'hooks/useI18n'
import useGetLotteryHasDrawn from 'hooks/useGetLotteryHasDrawn'

const WinningNumbers: React.FC = () => {
  const { account } = useWeb3React()
  const winNumbers = useWinningNumbers()
  const lotteryHasDrawn = useGetLotteryHasDrawn()
  const MatchedNumber4 = useMatchingRewardLength(4)
  const MatchedNumber3 = useMatchingRewardLength(3)
  const MatchedNumber2 = useMatchingRewardLength(2)
  const TranslateString = useI18n()

  return (
    <Card>
      <CardBody>
        <StyledCardContentInner>
          <StyledCardHeader>
            <Title>
              {account && lotteryHasDrawn
                ? `🥳${TranslateString(570, 'Winning Numbers This Round')}🥳`
                : TranslateString(440, 'Latest Winning Numbers')}
            </Title>
            <br />
          </StyledCardHeader>
          {/* <Row>
            {winNumbers.map((number, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <TicketNumberBox key={index}>
                <CenteredText>{number}</CenteredText>
              </TicketNumberBox>
            ))}
          </Row> */}
          <Row>
            <TicketNumberBox >
               <CenteredText>{winNumbers[0]}</CenteredText>
            </TicketNumberBox>
            <TicketNumberBox2>
              <CenteredText >{winNumbers[1]}</CenteredText>
            </TicketNumberBox2>
            <TicketNumberBox3 >
              <CenteredText>{winNumbers[2]}</CenteredText>
            </TicketNumberBox3>
            <TicketNumberBox4 >
              <CenteredText>{winNumbers[3]}</CenteredText>
            </TicketNumberBox4>
          </Row>
           <RabbitRow>
            <RabbitBox>
              <CardImage>
                <Image src="/images/SOUP-bowl-0.svg" alt="Number 1" width={200} height={200} responsive />
              </CardImage>
            </RabbitBox>
            <RabbitBox>
              <CardImage >
                <Image src="/images/SOUP-bowl-1.svg" alt="Number 2" width={200} height={200} responsive />
              </CardImage>
            </RabbitBox>
            <RabbitBox>
              <CardImage >
                <Image src="/images/SOUP-bowl-2.svg" alt="Number 3" width={200} height={200} responsive />
              </CardImage>
            </RabbitBox>
            <RabbitBox>
              <CardImage >
                <Image src="/images/SOUP-bowl-3.svg" alt="Number 4" width={200} height={200} responsive />
              </CardImage>
            </RabbitBox>
          </RabbitRow>
          {/* <RabbitRowSmall>
            <RabbitBoxSmall>
              <CardImageFirst>
                <Image src="/images/SOUP-bowl-0.svg" alt="Number 1" width={200} height={150} responsive />
              </CardImageFirst>
            </RabbitBoxSmall>
            <RabbitBoxSmall>
              <CardImage >
                <Image src="/images/SOUP-bowl-2.svg" alt="Number 2" width={200} height={150} responsive />
              </CardImage>
            </RabbitBoxSmall>
            <RabbitBoxSmall>
              <CardImage >
                <Image src="/images/SOUP-bowl-2.svg" alt="Number 3" width={200} height={150} responsive />
              </CardImage>
            </RabbitBoxSmall>
            <RabbitBoxSmall>
              <CardImage>
                <Image src="/images/SOUP-bowl-3.svg" alt="Number 4" width={200} height={150} responsive />
              </CardImage>
            </RabbitBoxSmall>
          </RabbitRowSmall> */}

          <CenteredTextWithPadding>{TranslateString(442,'Winner tickets')}</CenteredTextWithPadding>
          <Row>
            <RowWithBackground4>
              <CenteredTextWithPaddingWhite>{TranslateString(442, 'Match 4:')}</CenteredTextWithPaddingWhite>
              <CenteredTextWithPaddingWhite>
                <strong>{MatchedNumber4}</strong>
              </CenteredTextWithPaddingWhite>
            </RowWithBackground4>
            <RowWithBackground3>
              <CenteredTextWithPaddingWhite>{TranslateString(444, 'Match 3:')}</CenteredTextWithPaddingWhite>
              <CenteredTextWithPaddingWhite>
                <strong>{MatchedNumber3}</strong>
              </CenteredTextWithPaddingWhite>
            </RowWithBackground3>
            <RowWithBackground2>
              <CenteredTextWithPaddingWhite>{TranslateString(446, 'Match 2:')}</CenteredTextWithPaddingWhite>
              <CenteredTextWithPaddingWhite>
                <strong>{MatchedNumber2}</strong>
              </CenteredTextWithPaddingWhite>
            </RowWithBackground2>
          </Row>
          {/* <Link href="https://api.pancakeswap.com/api/lottery?page=0&pageSize=25" target="_blank">
            {TranslateString(448, 'Export recent winning numbers')}
          </Link> */}
        </StyledCardContentInner>
      </CardBody>
    </Card>
  )
}
const Link = styled.a`
  margin-top: 1em;
  text-decoration: none;
  color: #25beca;
`

const Row = styled.div`
  margin-top: 1em;
  align-items: center;
  display: flex;
  flex-direction: row;
`

const RabbitRow = styled.div`
  margin-top: -4.2em;
  align-items: center;
  display: flex;
  flex-direction: row;

  
`

const RabbitRowSmall = styled.div`
  margin-top: -2.3em;
  align-items: center;
  display: flex;
  flex-direction: row;

  @media (min-width: 768px) {
    display: none;
  }
`

const CardImage = styled.div`
  text-align: center;
`

const RowWithBackground = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  border-radius: 4px;
  background-color: #00000010;
  margin-right: 16px
`

const RowWithBackground4 = styled(RowWithBackground)`
  background-color: #e46c2c;
`
const RowWithBackground3 = styled(RowWithBackground)`
  background-color: #6abf68;
`
const RowWithBackground2 = styled(RowWithBackground)`
  background-color: #6abfb9;
`
const Column = styled.div`
  margin-top: 1em;
  align-items: center;
  display: flex;
  padding-left: 2px;
  padding-right: 2px;
  flex-direction: column;
`

const CenteredText = styled.div`
  text-align: center;
  align-items: center;
`

const CenteredTextWithPadding = styled.div`
  text-align: center;
  align-items: center;
  padding-left: 2px;
  padding-right: 2px;
  margin: 4px;
`
const CenteredTextWithPaddingWhite = styled(CenteredTextWithPadding)`
  color: white;
`
const TicketNumberBox = styled.div`
  padding-top: 16px;
  padding-bottom: 16px;
  border-radius: 42px;
  background-color: #00000010;
  color: #EF4136;
  font-size: 48px;
  font-weight: 900;
  margin: 10px;
  margin-bottom: 20px;
  width: 80px;
`

const TicketNumberBox2 = styled(TicketNumberBox)`
  color: #e46c2c;  
`
const TicketNumberBox3 = styled(TicketNumberBox)`
  color: #6abf68;
`
const TicketNumberBox4 = styled(TicketNumberBox)`
  color: #6abfb9;  
`

const RabbitBox = styled.div`
  /* padding: 10px; */
  border-radius: 12px;
  margin: 16px 20px;
  width: 60px;
`

const RabbitBoxSmall = styled.div`
  padding-top: 10px;
  padding-left: 10px;
  border-radius: 12px;
  margin: 20px;
  width: 20px;
`

const StyledCardHeader = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`

const Title = styled.div`
  color: ${(props) => props.theme.colors.secondary};
  font-size: 24px;
  width: 50vw;
  text-align: center;
  font-weight: 1000;
`

const StyledCardContentInner = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`

export default WinningNumbers

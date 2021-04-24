import React from 'react'
import styled from 'styled-components'
import { Heading, CardBody, CardFooter, PancakeRoundIcon, TicketRound } from 'soups-lottery-uikit'
import useI18n from 'hooks/useI18n'
import { DataResponse } from 'utils/getLotteryRoundData'
import LotteryCardHeading from '../LotteryCardHeading'
import PastLotteryActions from './PastLotteryActions'
import PrizeGrid from '../PrizeGrid'
import Timestamp from '../Timestamp'

interface PastRoundCardDetailsProps {
  data: DataResponse
}

const CardHeading = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const TopLotteryCardHeading = styled(LotteryCardHeading)`
  margin-bottom: ${(props) => props.theme.spacing[4]}px;
`

const PastRoundCardDetails: React.FC<PastRoundCardDetailsProps> = ({ data }) => {
  const TranslateString = useI18n()

  const {
    lotteryNumber,
    lotteryDate,
    lotteryNumbers,
    totalRewards,
    burned,
    contractLink,

    ticketsMatch4,
    ticketsMatch3,
    ticketsMatch2,

    potMatch4,
    potMatch3,
    potMatch2,

  } = data

  return (
    !data.error &&
    data && (
      <>
        <CardBody>
          <CardHeading>
           {/* <Timestamp timeValue={lotteryDate} /> */}
            <Heading size="md" mb="24px">
              Round #{lotteryNumber}
            </Heading>
            <TopLotteryCardHeading
              valueToDisplay={`${lotteryNumbers[0]}, ${lotteryNumbers[1]}, ${lotteryNumbers[2]}, ${lotteryNumbers[3]}`}
              Icon="/images/SOUP-ticket.svg"
            >
              {TranslateString(999, 'Winning numbers')}
            </TopLotteryCardHeading>
            <LotteryCardHeading
              valueToDisplay={TranslateString(999, `${totalRewards.toLocaleString()} SOUP`)}
              Icon="/images/SOUP-new.svg"
            >
              {TranslateString(999, 'Total prizes')}
            </LotteryCardHeading>
          </CardHeading>
        </CardBody>
        <CardFooter>
          <PrizeGrid
            totalRewards={totalRewards}
            ticketsMatch4={ticketsMatch4}
            ticketsMatch3={ticketsMatch3}
            ticketsMatch2={ticketsMatch2}
            potMatch4={potMatch4}
            potMatch3={potMatch3}
            potMatch2={potMatch2}
            burned={burned}
            pastDraw
          />
          <PastLotteryActions contractLink={contractLink} lotteryNumber={lotteryNumber} />
        </CardFooter>
      </>
    )
  )
}

export default PastRoundCardDetails

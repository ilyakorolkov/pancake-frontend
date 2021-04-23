import React from 'react'
import styled from 'styled-components'
import useI18n from 'hooks/useI18n'
import { Heading, Text } from '@pancakeswap-libs/uikit'
import { BigNumber } from 'bignumber.js'
import { usePriceCakeBusd, usePriceTokenBusd } from 'state/hooks'
import { LOTTERY_ALLOCATION} from 'config'
import CardBusdValue from '../../Home/components/CardBusdValue'
import tokens from '../../../config/constants/tokens'
import { getAddressForChain } from '../../../utils/addressHelpers'

export interface PrizeGridProps {
  totalRewards?: number
  pastDraw?: boolean
  burned?: number
  ticketsMatch4?: number
  ticketsMatch3?: number
  ticketsMatch2?: number
  potMatch4?: number
  potMatch3?: number
  potMatch2?: number
}

const Grid = styled.div<{ pastDraw?: boolean }>`
  display: grid;
  grid-template-columns: repeat(${(props) => (props.pastDraw ? 3 : 2)}, 1fr);
  grid-template-rows: repeat(4, auto);
`

const RightAlignedText = styled(Text)`
  text-align: right;
`

const RightAlignedHeading = styled(Heading)`
  text-align: right;
`

const GridItem = styled.div<{ marginBottom?: string }>`
  margin-bottom: ${(props) => (props.marginBottom ? props.marginBottom : '10px')};
`

const PastDrawGridItem = styled(GridItem)`
  transform: translate(-40%, 0%);
`

const PrizeGrid: React.FC<PrizeGridProps> = ({ totalRewards = 0,
                                               pastDraw = false,
                                               burned,
                                               ticketsMatch4,
                                               ticketsMatch3,
                                               ticketsMatch2,
                                               potMatch4,
                                               potMatch3,
                                               potMatch2,
}) => {
  const fourMatchesAmount = +(pastDraw ? potMatch4 : (totalRewards / 100) * LOTTERY_ALLOCATION[0]).toFixed(2)
  const threeMatchesAmount = +(pastDraw ? potMatch3 : (totalRewards / 100) * LOTTERY_ALLOCATION[1]).toFixed(2)
  const twoMatchesAmount = +(pastDraw ? potMatch2 : (totalRewards / 100) * LOTTERY_ALLOCATION[2]).toFixed(2)
  const burnAmount = +(pastDraw ? burned : (totalRewards / 100) * LOTTERY_ALLOCATION[4]).toFixed(2)
  const carriedForward = totalRewards - burnAmount - twoMatchesAmount - threeMatchesAmount - fourMatchesAmount;
  const TranslateString = useI18n()
  const cakeBusdPrice = usePriceTokenBusd(getAddressForChain(tokens.soup.address, 56));

  const getCakeBusdValue = (amount: number) => {
    return new BigNumber(amount).multipliedBy(cakeBusdPrice).toNumber()
  }

  return (
    <Grid pastDraw={pastDraw}>
      <GridItem>
        <Text fontSize="14px" color="textSubtle">
          {TranslateString(756, 'No. Matched')}
        </Text>
      </GridItem>
      {pastDraw && (
        <PastDrawGridItem>
          <RightAlignedText fontSize="14px" color="textSubtle">
            {TranslateString(754, 'Winners')}
          </RightAlignedText>
        </PastDrawGridItem>
      )}
      <GridItem>
        <RightAlignedText fontSize="14px" color="textSubtle">
          {TranslateString(752, pastDraw ? 'Prize Given' : 'Prize Pot')}
        </RightAlignedText>
      </GridItem>
      {/* 4 matches row */}
      <GridItem>
        <Heading size="md">4</Heading>
      </GridItem>
      {pastDraw && (
        <PastDrawGridItem>
          <RightAlignedHeading size="md">{ticketsMatch4}</RightAlignedHeading>
        </PastDrawGridItem>
      )}
      <GridItem>
        <RightAlignedHeading size="md">
          {fourMatchesAmount.toLocaleString()}
          {!pastDraw && !cakeBusdPrice.eq(0) && <CardBusdValue value={getCakeBusdValue(fourMatchesAmount)} />}
        </RightAlignedHeading>
      </GridItem>
      {/* 3 matches row */}
      <GridItem>
        <Text bold>3</Text>
      </GridItem>
      {pastDraw && (
        <PastDrawGridItem>
          <RightAlignedText bold>{ticketsMatch3}</RightAlignedText>
        </PastDrawGridItem>
      )}
      <GridItem>
        <RightAlignedText>
          {threeMatchesAmount.toLocaleString()}
          {!pastDraw && !cakeBusdPrice.eq(0) && <CardBusdValue value={getCakeBusdValue(threeMatchesAmount)} />}
        </RightAlignedText>
      </GridItem>
      {/* 2 matches row */}
      <GridItem>
        <Text>2</Text>
      </GridItem>
      {pastDraw && (
        <PastDrawGridItem>
          <RightAlignedText>{ticketsMatch2}</RightAlignedText>
        </PastDrawGridItem>
      )}
      <GridItem>
        <RightAlignedText>
          {twoMatchesAmount.toLocaleString()}
          {!pastDraw && !cakeBusdPrice.eq(0) && <CardBusdValue value={getCakeBusdValue(twoMatchesAmount)} />}
        </RightAlignedText>
      </GridItem>
      {/* Burn row
      <GridItem marginBottom="0">
        <Text>{TranslateString(999, `${pastDraw ? 'Burned' : 'To burn'}`)}:</Text>
      </GridItem> */}
      <GridItem marginBottom="0">
        <Text>
          Carried to next round
        </Text>
      </GridItem>
      {pastDraw ? (
        <>
          <GridItem marginBottom="0" />
          <GridItem marginBottom="0">
            <RightAlignedText>{carriedForward.toLocaleString()}</RightAlignedText>
          </GridItem>
        </>
      ) : (
        <GridItem marginBottom="0">
          <RightAlignedText>{carriedForward.toLocaleString()}</RightAlignedText>
        </GridItem>
      )}
    </Grid>
  )
}

export default PrizeGrid

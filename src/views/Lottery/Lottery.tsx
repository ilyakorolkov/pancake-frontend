import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { ButtonMenu, ButtonMenuItem } from 'soups-lottery-uikit'
import PastLotteryDataContext from 'contexts/PastLotteryDataContext'
import { getLotteryIssueIndex } from 'utils/lotteryUtils'
import useI18n from 'hooks/useI18n'
import { useLottery } from 'hooks/useContract'
import Page from 'components/layout/Page'
import Hero from './components/Hero'
import Divider from './components/Divider'
import NextDrawPage from './NextDrawPage'
import PastDrawsPage from './PastDrawsPage'
import HowItWorksPage from './HowItWorksPage'
import LotteryProgress from './components/LotteryProgress'

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 32px;
`

const LeftWrapper = styled.div`
  flex: 1;
  padding-right: 0;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-right: 24px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    padding-right: 32px;
  }
`

const Lottery: React.FC = () => {
  const lotteryContract = useLottery()
  const TranslateString = useI18n()
  const [activeIndex, setActiveIndex] = useState(0)
  const [historyData, setHistoryData] = useState([])
  const [historyError, setHistoryError] = useState(false)
  const [currentLotteryNumber, setCurrentLotteryNumber] = useState(0)
  const [mostRecentLotteryNumber, setMostRecentLotteryNumber] = useState(1)

  useEffect(() => {
    fetch(`https://api.pancakeswap.com/api/lotteryHistory`)
      .then((response) => response.json())
      .then((data) => setHistoryData(data))
      .catch(() => {
        setHistoryError(true)
      })
  }, [])

  useEffect(() => {
    const getInitialLotteryIndex = async () => {
      const index = await getLotteryIssueIndex(lotteryContract)
      const previousLotteryNumber = index - 1

      setCurrentLotteryNumber(index)
      setMostRecentLotteryNumber(previousLotteryNumber)
    }

    if (lotteryContract) {
      getInitialLotteryIndex()
    }
  }, [lotteryContract])

  const handleClick = (index) => {
    setActiveIndex(index)
  }

  return (
    <>
      <Hero />
      <Page>
        <Wrapper>
        <LotteryProgress />
        </Wrapper>
        <Wrapper>
          <ButtonMenu activeIndex={activeIndex} onItemClick={handleClick} scale="sm" variant="primary">
            <ButtonMenuItem>{TranslateString(716, 'Next draw')}</ButtonMenuItem>
            <ButtonMenuItem>{TranslateString(718, 'Past draws')}</ButtonMenuItem>
            <ButtonMenuItem>{TranslateString(718, 'How it works')}</ButtonMenuItem>
          </ButtonMenu>
        </Wrapper>
        <PastLotteryDataContext.Provider
          value={{ historyError, historyData, mostRecentLotteryNumber, currentLotteryNumber }}
        >
          {/* eslint-disable-next-line no-nested-ternary */}
          {activeIndex === 0 ? <NextDrawPage /> : (activeIndex === 1 ? <PastDrawsPage /> : <HowItWorksPage />)}
        </PastLotteryDataContext.Provider>
      </Page>
    </>
  )
}

export default Lottery

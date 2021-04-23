import { BigNumber } from 'bignumber.js'
import {
  getBurnedForRound,
  getPotMatchForRound,
  getTotalRewardsForRound,
  getWinningNumbersForRound,
} from './lotteryUtils'
import { getLotteryContract, getLotteryTicketContract } from './contractHelpers'
import { getBalanceNumber } from './formatBalance'
import { LOTTERY_TICKET_PRICE } from '../config'

export type DataResponse = {
  lotteryNumber: number
  lotteryDate: string
  lotteryNumbers: number[]
  totalRewards: number
  contractLink: string
  ticketsMatch4: number
  ticketsMatch3: number
  ticketsMatch2: number
  potMatch4: number
  potMatch3: number
  potMatch2: number
  burned: number
  // TODO: Fill in the error type
  error: any
}
/**
 * Get data for a specific lottery
 */
export const getLotteryRoundData = async (lotteryNumber: number): Promise<DataResponse> => {
  const lotteryContract = getLotteryContract()
  try {

    // const response = await fetch(`https://api.pancakeswap.com/api/singleLottery?lotteryNumber=${lotteryNumber}`)
    // const data = await response.json()
    const totalRewards = +getBalanceNumber(await getTotalRewardsForRound(lotteryContract, lotteryNumber)).toFixed(2)
    const amountBurned = +getBalanceNumber(await getBurnedForRound(lotteryContract, lotteryNumber)).toFixed(2)

    const lotteryNumbers = await getWinningNumbersForRound(lotteryContract, lotteryNumber)

    const potMatch4 = await getPotMatchForRound(lotteryContract, lotteryNumber, 4)
    const potMatch3 = await getPotMatchForRound(lotteryContract, lotteryNumber, 3);
    const potMatch2 = await getPotMatchForRound(lotteryContract, lotteryNumber, 2);

    const ticketsMatch4 = new BigNumber(potMatch4).div(LOTTERY_TICKET_PRICE).toNumber();
    const ticketsMatch3 = new BigNumber(potMatch3).div(LOTTERY_TICKET_PRICE).toNumber();
    const ticketsMatch2 = new BigNumber(potMatch2).div(LOTTERY_TICKET_PRICE).toNumber();

    const data = new Promise<DataResponse>((resolve) => resolve({
      'lotteryNumber': lotteryNumber,
      'lotteryDate': '2020-10-24T04:00:00.000Z',
      'lotteryNumbers': lotteryNumbers,
      'totalRewards': totalRewards,
      'burned': amountBurned,
      'contractLink': 'https://bscscan.com/address/0x3C3f2049cc17C136a604bE23cF7E42745edf3b91',

      'ticketsMatch4': ticketsMatch4,
      'ticketsMatch3': ticketsMatch3,
      'ticketsMatch2': ticketsMatch2,

      'potMatch4': +potMatch4.toFixed(2),
      'potMatch3': +potMatch3.toFixed(2),
      'potMatch2': +potMatch2.toFixed(2),

      'error': null,
    }))

    return data;
  } catch (error) {
    throw new Error(error)
  }
}

export default getLotteryRoundData

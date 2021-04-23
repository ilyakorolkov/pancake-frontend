import Web3 from 'web3'
import { HttpHeader, HttpProviderOptions } from 'web3-core-helpers'
import getRpcUrl from 'utils/getRpcUrl'

const RPC_URL = getRpcUrl()
const httpProvider = new Web3.providers.HttpProvider(RPC_URL, { timeout: 10000 } as HttpProviderOptions)
const web3NoAccount = new Web3(httpProvider)

const getWeb3NoAccount = () => {
  return web3NoAccount
}

const getWeb3NoAccountMainnet = () => {
  const header : HttpHeader[] = [{name:"Access-Control-Allow-Origin", value:"*"}]
  header.push({name:"Access-Control-Allow-Methods", value:"GET, PUT, POST, DELETE, HEAD, OPTIONS"})
  header.push({name:"Access-Control-Allow-Headers", value:"Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"})
  header.push({name:"Access-Control-Allow-Credentials", value:"true"});

  const httpProviderM = new Web3.providers.HttpProvider("https://bsc-dataseed3.binance.org", { timeout: 10000, headers: header } as HttpProviderOptions);
  return new Web3(httpProviderM)
}

export { getWeb3NoAccount, getWeb3NoAccountMainnet }
export default web3NoAccount

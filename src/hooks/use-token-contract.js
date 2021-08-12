import { useState, useEffect } from 'react'
import { Contract, getDefaultProvider, providers } from 'ethers'

import ERC20ABI from '../abis/erc20'

function useTokenContract (wallet) {
  const [contract, setContract] = useState()

  useEffect(() => {
    const provider = wallet
      ? wallet.provider.getSigner()
      : window.ethereum
        ? new providers.Web3Provider(window.ethereum)
        : getDefaultProvider()
    const contract = new Contract(process.env.REACT_APP_HEZ_TOKEN_ADDRESS, ERC20ABI, provider)

    setContract(contract)
  }, [wallet])

  return contract
}

export default useTokenContract
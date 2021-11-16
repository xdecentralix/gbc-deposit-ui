import Header from '../shared/header/header.view'
import useTxOverviewStyles from './tx-overview.styles'
import { ReactComponent as CheckIcon } from '../../images/check-icon.svg'
import { ReactComponent as LinkIcon } from '../../images/link-icon.svg'
import { ReactComponent as MetaMaskLogo } from '../../images/metamask-logo.svg'
import { ReactComponent as WarningIcon } from '../../images/warning.svg'
import useWatchAsset from '../../hooks/use-watch-asset'

const explorerUrl = {
  1: 'https://etherscan.io/tx/',
  4: 'https://rinkeby.etherscan.io/tx/',
  100: 'https://blockscout.com/xdai/mainnet/tx/'
}

function TxOverview ({ wallet, swapData, fromTokenInfo, toTokenInfo, onGoBack, onDisconnectWallet, isMetamask }) {
  const classes = useTxOverviewStyles()
  const watchAsset = useWatchAsset()

  return (
    <div className={classes.txOverview}>
      <Header
        address={wallet.address}
        fromTokenInfo={fromTokenInfo}
        toTokenInfo={toTokenInfo}
        onGoBack={onGoBack}
        onDisconnectWallet={onDisconnectWallet}
        chainId={wallet.chainId}
      />
      <CheckIcon className={classes.checkIcon} />
      <p className={classes.title}>{fromTokenInfo.symbol} token conversion to {toTokenInfo.symbol} has been completed.</p>
      <div className={classes.note}>
        <p className={classes.noteTitle}>
          <WarningIcon width="18px" /> Note
        </p>
        {wallet.chainId === '1' ? (
          <p>
            If you want to use STAKE tokens on Ethereum, please refer to{' '}
            <a
              className={classes.noteLink}
              href="https://www.xdaichain.com/for-stakers/stake-token/get-stake"
              target='_blank'
              rel='noopener noreferrer'
            >
              this
            </a>
            {' '}list of exchanges.
          </p>
        ) : (
          <p>
            If you want to send STAKE tokens on xDai chain to a centralized exchange, please use{' '}
            <a
              className={classes.noteLink}
              href="https://ascendex.com/"
              target='_blank'
              rel='noopener noreferrer'
            >
              AscendEx
            </a>.
            Be sure to connect to the xDai chain when sending STAKE to AscendEx.<br/>
            If you want to transfer STAKE to other exchanges on Ethereum,
            be sure to use{' '}
            <a
              className={classes.noteLink}
              href="https://omni.xdaichain.com/"
              target='_blank'
              rel='noopener noreferrer'
            >
              Omnibridge
            </a>
            {' '}to transfer STAKE to Ethereum chain first.
          </p>
        )}
      </div>
      <div className={classes.buttonGroup}>
        <a
          className={classes.howToUseLink}
          href="https://poanetwork.page.link/learnmore"
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn how to use STAKE
        </a>
        <a
          className={classes.button}
          href={`${explorerUrl[wallet.chainId]}${swapData.data.hash}`}
          target='_blank'
          rel='noopener noreferrer'
        >
          Check transaction details here
          <LinkIcon className={classes.buttonIcon} />
        </a>
        {isMetamask && (
          <button
            className={classes.button}
            onClick={() => watchAsset(wallet, toTokenInfo)}
          >
            Add {toTokenInfo.symbol} token to MetaMask
            <MetaMaskLogo className={classes.buttonIcon} />
          </button>
        )}
      </div>
    </div>
  )
}

export default TxOverview

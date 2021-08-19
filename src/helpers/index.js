
import { useAccountPrimary } from '../hooks/accountPrimary'
import { useAccountSecondary } from '../hooks/accountSecondary'

function getPercentage (from, to) {
  const decreaseValue = from - to
  return Math.abs((decreaseValue / from) * 100)
}

function getCorrectContext (account) {
  if (account === 'primary') return useAccountPrimary
  if (account === 'secondary') return useAccountSecondary
}

export {
  getPercentage,
  getCorrectContext
}

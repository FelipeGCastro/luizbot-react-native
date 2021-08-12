import React from 'react'

import {
  Container,
  TradeWrapper,
  TradeStatus,
  TradeBox,
  TradeLoss,
  TradeDeal,
  TradeGain,
  MarketSwipe,
  TradeBody,
  TradeAccountContainer,
  TradeOnContainer,
  SymbolContainer,
  StrategyContainer,
  ProfitContainer,
  LeverageContainer,
  EntryValueContainer,
  BalanceContainer,
  ProfitHistoryContainer,
  ProfitBox
} from './styles'

const Dashboard = () => {
  return (
    <Container>
      <TradeWrapper>
        <TradeStatus />
        <TradeBox>
          <TradeLoss />
          <TradeDeal />
          <TradeGain />
        </TradeBox>
      </TradeWrapper>
      <MarketSwipe />
      <TradeBody>
        <TradeAccountContainer>
          <TradeOnContainer />
          <SymbolContainer />
          <StrategyContainer />
          <ProfitContainer />
          <LeverageContainer />
          <EntryValueContainer />
          <BalanceContainer />
        </TradeAccountContainer>
        <ProfitHistoryContainer>
          <ProfitBox />
        </ProfitHistoryContainer>
      </TradeBody>
    </Container>
  )
}

export default Dashboard

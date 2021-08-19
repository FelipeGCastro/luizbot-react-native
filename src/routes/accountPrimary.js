import React from 'react'
import Dashboard from '../screens/Dashboard'

const DashboardPrimary = ({ navigation }) => {
  return (
    <Dashboard navigation={navigation} account='primary' />
  )
}

export default DashboardPrimary

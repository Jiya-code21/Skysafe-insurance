import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [userPersona, setUserPersona] = useState(null); // 'food', 'ecommerce', 'grocery'

  const [coverageData, setCoverageData] = useState({
    activeWeeklyCoverage: 6000, // ₹
    earningsProtected: 15000,   // ₹
    premiumPaid: 150,           // ₹
    riskZone: 'Safe Zone - Low Risk',
    weeklyPremiumCalc: 150,     // dynamic based on selection
  });

  const [claimsData, setClaimsData] = useState([
    { id: 'CLM-1002', type: 'Heat Wave Trigger', date: '10 Mar 2026', status: 'Auto-Triggered (Processing)', amount: 800 },
    { id: 'CLM-1001', type: 'Heavy Rain Disruption', date: '02 Mar 2026', status: 'Paid', amount: 1200 },
  ]);

  return (
    <AppContext.Provider value={{
      userPersona, setUserPersona,
      coverageData, setCoverageData,
      claimsData, setClaimsData
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}

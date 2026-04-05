/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useCallback, useMemo } from "react";
import type { ReactNode } from "react";

type CurrencyConfig = {
  code: string;
  symbol: string;
  rate: number; // conversion rate from base (GHS)
};

const CURRENCIES: Record<string, CurrencyConfig> = {
  GH: { code: "GHS", symbol: "GH₵", rate: 1 },
  US: { code: "USD", symbol: "$", rate: 0.065 },
  GB: { code: "GBP", symbol: "£", rate: 0.051 },
  DE: { code: "EUR", symbol: "€", rate: 0.059 },
};

type CurrencyContextType = {
  countryCode: string;
  currency: CurrencyConfig;
  setCountryCode: (code: string) => void;
  formatPrice: (priceInGHS: number) => string;
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [countryCode, setCountryCode] = useState("GH");

  const currency = CURRENCIES[countryCode] || CURRENCIES.GH;

  const formatPrice = useCallback(
    (priceInGHS: number) => {
      const converted = priceInGHS * currency.rate;
      return `${currency.symbol}${converted.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;
    },
    [currency]
  );

  const value = useMemo(
    () => ({ countryCode, currency, setCountryCode, formatPrice }),
    [countryCode, currency, formatPrice]
  );

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) throw new Error("useCurrency must be used within CurrencyProvider");
  return context;
};

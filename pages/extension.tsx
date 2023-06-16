import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import CurrencyPicker from "@/components/currencyPicker";
import BankDetails from "@/components/bankDetails";
import Footer from "@/components/footer";

interface APIResponse {
  bank: string;
  buying_currency: string;
  buying_tt: string;
  buying_od: string;
  selling_currency: string;
  selling_tt: string;
  selling_od: string;
  date: string;
  created_time: string;
  currency: string;
  buying_check: string;
  selling_check: string;
}

export default function Extension() {
  const [fetchedData, setFetchedData] = useState<APIResponse[]>([]);
  const [currency, setCurrency] = useState("USD");
  const [isLoaded, setIsLoaded] = useState(false);

  const currencies = ["USD", "EUR", "GBP", "AUD"];

  async function fetchData(currency: string, date: string, isLoading = false) {
    setIsLoaded(isLoading);
    const response = await fetch(
      `/api/exrates?currency=${currency}&date=${date}&latest=true`
    );

    const data = await response.json();

    return data.data;
  }

  useEffect(() => {
    const fetchCurrencyData = async (currency: string, date: string) => {
      const response = await fetch(
        `/api/exrates?currency=${currency}&date=${date}&latest=true`
      );
      const data = await response.json();

      // Save fetched data to localStorage with expiry time
      const expiry = new Date().getTime() + 60 * 60 * 1000; // 1 hour expiry
      localStorage.setItem(currency, JSON.stringify(data.data));
      localStorage.setItem(`${currency}_expiry`, expiry.toString());
      return data.data;
    };

    // Check if cached data is available and not expired
    const expiry = localStorage.getItem(`${currency}_expiry`);
    const currentTime = new Date().getTime();

    if (currentTime < parseInt(expiry || "")) {
      // If valid cached data is available, use it
      const parsedData = JSON.parse(localStorage.getItem(currency) || "");
      setFetchedData(parsedData);
      setIsLoaded(true);
    } else {
      const currentDate = new Date().toISOString().split("T")[0];
      fetchCurrencyData(currency, currentDate)
        .then((data) => setFetchedData(data))
        .catch((error) => console.log(error))
        .finally(() => setIsLoaded(true));
    }
  }, [currency]);

  if (!isLoaded) {
    return (
      <div className="w-max my-2 mx-auto p-4 bg-slate-700 rounded-lg text-white font-semibold">
        <CurrencyPicker
          currencies={currencies}
          selectedCurrency={currency}
          setSelectedCurrency={setCurrency}
        />
        <div className="w-[calc(12rem+50px)]">
          <div className="animate-pulse flex space-x-4">
            <div className="flex-1 space-y-4 py-1">
              <div className="h-4 bg-gray-400 rounded w-3/4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-400 rounded"></div>
                <div className="h-4 bg-gray-400 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="w-max my-2 mx-auto p-4 bg-slate-700 rounded-lg text-white font-semibold">
      <CurrencyPicker
        currencies={currencies}
        selectedCurrency={currency}
        setSelectedCurrency={setCurrency}
      />

      <div className="flex items-center justify-center gap-4 w-full px-2 ml-2 mt-2">
        <div className="w-[calc(12rem+50px)]"></div>

        <div className="w-20">Buying</div>
        <div className="w-20">Selling</div>
        <div></div>
      </div>
      {isLoaded &&
        fetchedData.map((bank) => (
          <BankDetails
            key={bank.bank}
            bankLogo="/images/bank.png"
            bankName={bank.bank}
            buyingRate={bank.buying_currency}
            sellingRate={bank.selling_currency}
          />
        ))}
      <Footer />
    </div>
  );
}

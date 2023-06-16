type BankDetailsProps = {
  bankName: string;
  buyingRate: string;
  sellingRate: string;

  bankLogo: string;
};

function BankDetails({
  bankName,
  buyingRate,
  sellingRate,
  bankLogo,
}: BankDetailsProps) {
  const bankData = {
    COMMERCIAL: {
      bankName: "Commercial Bank",
      logo: "/commercial.png",
    },
    CBSL: {
      bankName: "Central Bank of Sri Lanka",
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/3/35/Central_Bank_of_Sri_Lanka_logo.png/220px-Central_Bank_of_Sri_Lanka_logo.png",
    },
    SAMPATH: {
      bankName: "Sampath Bank",
      logo: "https://seeklogo.com/images/S/sampath-bank-logo-660B6E8BC9-seeklogo.com.png",
    },
    PEOPLES: {
      bankName: "People's Bank",
      logo: "https://tools.numbers.lk/_nuxt/PEOPLES.e1ca3c71.png",
    },
    BOC: {
      bankName: "Bank of Ceylon",
      logo: "/boc.png",
    },
  };

  function convertToDecimal(num: string, decimalCount = 2) {
    return parseFloat(num).toFixed(decimalCount);
  }

  return (
    <div className="min-w-max h-[64px] m-1 py-0 px-3 flex items-center justify-start w-full border border-gray-500 rounded-md p-1 bg-slate-500">
      <div className="h-12 w-[50px] flex items-center justify-center mr-2">
        <img
          src={bankData[bankName as keyof typeof bankData]?.logo || bankLogo}
          alt={
            bankData[bankName as keyof typeof bankData]?.bankName || bankName
          }
          className="w-full"
        />
      </div>
      <div className="w-48 mx-2">
        {bankData[bankName as keyof typeof bankData]?.bankName || bankName}
      </div>
      <div className="w-20 mr-2">{convertToDecimal(buyingRate)}</div>
      <div className="w-20">{convertToDecimal(sellingRate)}</div>
      {/* </div> */}
    </div>
  );
}

export default BankDetails;

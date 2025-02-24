import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import { Link, useParams } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";

const EachCountryInformation = () => {
  const { countriesData } = useContext(ThemeContext);
  const { name } = useParams();
  console.log(name);
  
  const presentData = countriesData.find((eachCountry) => eachCountry?.name?.common == name);
  
  let currency = presentData?.currencies;
  let currencyName;
  if (currency) {
    currencyName = Object.values(currency)[0]?.name;
  }

  let languages;
  if (presentData?.languages) {
    languages = Object.values(presentData?.languages);
  }

  const borderCountries = presentData?.borders?.map((borderCode) => {
    const borderCountry = countriesData.find((country) => country.cca3 === borderCode);
    return borderCountry ? borderCountry.name.common : borderCode;
  });

  return (
    <section className="h-screen bg-[#fafafa] pt-12 px-8 md:px-20 dark:bg-[#202d36] dark:text-white flex flex-col gap-16">
      <section className="w-[120px] h-[40px] shadow-[1px_0px_5px_#ccc] rounded-sm flex items-center justify-center">
        <Link to="/" className="flex h-full w-full items-center justify-center gap-2">
          <BiArrowBack size={18} />
          <span>Back</span>
        </Link>
      </section>

      <section className="flex flex-col gap-12 md:flex-row md:justify-between">
        <section className="w-9/10 md:w-4/12">
          <img className="w-full" src={presentData?.flags?.png} alt={`${presentData?.name?.common} flag`} />
        </section>

        <section className="md:w-6/12 gap-4 flex flex-col md:gap-8 justify-center">
          <div className="font-bold text-3xl">{presentData?.name?.common}</div>
          <section className="flex flex-col gap-6 md:flex-row md:gap-40">
            <div className="flex flex-col">
              <div>
                <span className="font-md">Native Name: </span>
                <span className="text-[14px] font-md text-gray-500">
                  {presentData?.name?.nativeName?.fra?.common || presentData?.name?.official}
                </span>
              </div>
              <div>
                <span className="font-md">Population: </span>
                <span className="text-[14px] font-md text-gray-500">{presentData?.population}</span>
              </div>
              <div>
                <span className="font-md">Region: </span>
                <span className="text-[14px] font-md text-gray-500">{presentData?.region}</span>
              </div>
              <div>
                <span className="font-md">Sub Region: </span>
                <span className="text-[14px] font-md text-gray-500">{presentData?.subregion}</span>
              </div>
              <div>
                <span className="font-md">Capital: </span>
                <span className="text-[14px] font-md text-gray-500">{presentData?.capital?.[0]}</span>
              </div>
            </div>

            <div className="flex flex-col">
              <div>
                <span className="font-md">Top Level Domain: </span>
                <span className="text-[14px] font-md text-gray-500">{presentData?.tld}</span>
              </div>
              <div>
                <span className="font-md">Currencies: </span>
                <span className="text-[14px] font-md text-gray-500">{currencyName || "No currency"}</span>
              </div>
              <div>
                <span className="font-md">Languages: </span>
                <span className="text-[14px] font-md text-gray-500">
                  {languages?.length > 0
                    ? languages.map((eachLanguage, index) => (
                        <span key={index}>{`${eachLanguage}${index < languages.length - 1 ? ", " : ""}`}</span>
                      ))
                    : "No Languages"}
                </span>
              </div>
            </div>
          </section>

          <section>
            <div className="text-[14px] font-bold mt-4">Border Countries:</div>
            <div className="flex gap-2">
              {borderCountries && borderCountries.length > 0 ? (
                borderCountries.map((borderName, index) => (
                  <Link
                    key={index}
                    to={`/country/${borderName}`}
                    className="w-[120px] h-[30px] shadow-[1px_0px_5px_#ccc] rounded-sm flex items-center justify-center text-xs"
                  >
                    {borderName}
                  </Link>
                ))
              ) : (
                <span>No Border Countries</span>
              )}
            </div>
          </section>
        </section>
      </section>
    </section>
  );
};

export default EachCountryInformation;

import { useEffect, useState } from "react"
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import EachCountry from "./EachCountry";
import NoDataFound from "./NoDataFound";
import Loading from "./Loading";

const HomePage = () => {
  
  const [inputText, setInputText] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [filterRegionNames, setFilterRegionNames] = useState([]);
  const [allCountries, setAllCountries] = useState([]);
  const [filterCountriesData, setFilterCountriesData] = useState([]);
  const [regionName, setRegionName] = useState('');
  const [regionData, setRegionData] = useState([]);

  const handleInput = (e) => {
    const inputData = e.target.value.trim();
    setInputText(inputData);

    const dataToFilter = regionName ? regionData : allCountries;

    if (inputData.length !== 0) {
      // console.log(inputData,"in");
        const filteredData = dataToFilter.filter((eachCountry) =>
            eachCountry?.name?.common.toLowerCase().includes(inputData.toLowerCase())
        );
        // console.log(filteredData);
        setFilterCountriesData(filteredData);
    } else {
        setFilterCountriesData(dataToFilter);
    }
  };

  const handleRegionSearch = (e) => {
    const selectedRegion = e.target.innerText;
    // console.log(selectedRegion);

    const filterData = allCountries.filter((eachCountry) => {
        return eachCountry?.region?.toLowerCase().includes(selectedRegion.toLowerCase());
    });

    setFilterCountriesData(filterData);
    setRegionName(selectedRegion);
    setShowFilter(false);
    setRegionData(filterData);
    setInputText('');
    // console.log(filterData);
  };


  const fetchData = async()=>{
      const response = await fetch('https://restcountries.com/v3.1/all');
      const data = await response.json();
      console.log(data);
      setAllCountries(data);
      setFilterCountriesData(data);

      const regionNames = data.reduce((regionNames, eachCountry) =>{
        if(!regionNames.includes(eachCountry.region)){
          regionNames.push(eachCountry.region)
        }
        return regionNames;
      },[]);
      // console.log(regionNames)

      setFilterRegionNames(regionNames)

  };

  useEffect(()=>{
    fetchData();
  },[]);

  return (
   <section className={`min-h-screen bg-[#fafafa] mt-[4px] px-4 dark:bg-[#202d36] dark:text-white`}>
    <section className="pt-12 flex flex-col gap-12 md:gap-12 md:px-20">
     <div className="relative h-auto flex flex-col  gap-16 md:gap-12 md:flex-row md:justify-between ">
        <IoSearchOutline className="w-[25px] h-[25px] absolute top-[10%] md:top-[25%] left-[5%] md:left-[2%]"/>
        <input  type="text" value={inputText}  placeholder="Search for a country..." className="select-none w-full md:w-4/12 h-[60px] p-4 pl-24 shadow-md rounded-md dark:bg-[#2b3743] dark:text-white md:w-4/12" onChange={handleInput}/>
        <div className="w-1/2 md:w-4/12 xl:w-2/12 h-auto flex flex-col gap-1 dark:bg-[#2b3642] relative select-none rounded-md">
          <div className="flex gap-2 justify-between items-center shadow-lg h-10 px-4 py-8 rounded-md dark:bg-[#2b3642] bg-white cursor-pointer" onClick={() => setShowFilter((prev) => !prev)}>
            <div className="text-sm md:text-[16px]" >{regionName.length >0 ? regionName : "Filter by Region"}</div>
            <div>
              {showFilter ? (
                <FaChevronDown size={15} />   
              ) : (
                <FaChevronUp size={15} />
              )}
            </div>
          </div>
          {showFilter && (
            <div className="absolute top-full mt-1 left-0 w-full px-4 py-2 gap-2 bg-white shadow-md rounded-lg dark:bg-[#2b3642] z-50">
              {filterRegionNames.map((region) => (
                <div
                  key={region}
                  className="cursor-pointer dark:hover:bg-gray-800 p-2 hover:bg-gray-100" onClick={handleRegionSearch}
                >
                  {region}
                </div>
              ))}
            </div>
          )}
        </div>
     </div>
     <section className="flex justify-center gap-12 md:flex-row flex-wrap md:gap-12 md:justify-between">
          {
            allCountries.length ==0 ? <Loading /> : filterCountriesData.length ==0 ? <NoDataFound />
            :filterCountriesData.map((eachCountry)=>{
              return <EachCountry key={eachCountry?.name?.common} eachCountry={eachCountry}/>
            })

          }
     </section>
    </section>
   </section>
  )
}

export default HomePage

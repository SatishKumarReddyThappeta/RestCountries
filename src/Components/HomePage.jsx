import { useContext, useEffect, useState } from "react"
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import EachCountry from "./EachCountry";
import NoDataFound from "./NoDataFound";
import Loading from "./Loading";
import { ThemeContext } from "./ThemeContext";
import { Link } from "react-router-dom";
const HomePage = () => {
  
  const [inputText, setInputText] = useState('');
  const [showFilter, setShowFilter] = useState({
    region:false,
    subRegion: false,
    sort:false,
    sortArea: false
  });
  const [filterRegionNames, setFilterRegionNames] = useState([]);
  const [allCountries, setAllCountries] = useState([]);
  const [filterCountriesData, setFilterCountriesData] = useState([]);
  const [regionName, setRegionName] = useState('');
  const [regionData, setRegionData] = useState([]);
  const [subRegionNames, setSubregionNames] = useState([]);
  const [subRegionName, setSubregionName] = useState('');
  const [subRegionData, setSubregionData] = useState([]);
  const [sortPopulationWhich ,setSortPopulationWhich] = useState('');
  const [sortAreaWhich, setSortAreaWhich] = useState('');
  const {countriesData} = useContext(ThemeContext);
  // console.log(countriesData);

  const handleInput = (e) => {
    const inputData = e.target.value.trim();
    setInputText(inputData);


    if(regionName.length>0 && subRegionName.length >0 && inputData.length>0){
      const filteredData = regionData.filter((eachCountry) =>{
        return eachCountry?.name?.common.toLowerCase().includes(inputData.toLowerCase()) && eachCountry.subregion.toLowerCase() == subRegionName.toLocaleLowerCase();
      }
    );
      // console.log(filteredData);
      setFilterCountriesData(filteredData);
    }else if(subRegionName.length>0){
      console.log('last');
      console.log(subRegionData);
      setFilterCountriesData(subRegionData);
    }else{
      const dataToFilter = regionName ? regionData : allCountries;

      if (inputData.length !== 0) {
          const filteredData = dataToFilter.filter((eachCountry) =>
              eachCountry?.name?.common.toLowerCase().includes(inputData.toLowerCase())
          );
          setFilterCountriesData(filteredData);
      } else {
          setFilterCountriesData(dataToFilter);
      }
    }
  };

  const handleRegionSearch = (e) => {
    
    const selectedRegion = e.target.innerText;
    // console.log(selectedRegion);
    const filterData = allCountries.filter((eachCountry) => {
        return eachCountry?.region?.toLowerCase().includes(selectedRegion.toLowerCase());
    });

    const filterSubRegionName = filterData.reduce((filterSubRegionName, eachCountry)=>{
        if(eachCountry.subregion){
          if(!filterSubRegionName.includes(eachCountry.subregion)){
            filterSubRegionName.push(eachCountry.subregion);
          }
        }
        return filterSubRegionName;
    },[]);

    setSubregionNames(filterSubRegionName);
    // console.log(filterSubRegionName);

    setFilterCountriesData(filterData);
    setRegionName(selectedRegion);
    setShowFilter((prev) => ({...prev , region : !prev.region}));
    setRegionData(filterData);
    setInputText('');
    setSortPopulationWhich('');
    setSubregionName('');
    sortAreaWhich('')
    // console.log(filterData);
  };

  const handleSubRegionSearch = (e) =>{

    setInputText('');
    const subName = e.target.innerText;
    // console.log(subName);
    // console.log(subRegionNames);
    const filterSubRegionData = regionData.filter((eachCountry)=>{
      if(eachCountry.subregion){
        return eachCountry.subregion.toLowerCase().includes(subName.toLowerCase());
      }
    });

    // console.log(filterSubRegionData);
    setSortPopulationWhich('');
    setSortAreaWhich('');
    setSubregionName(e.target.innerText);
    setSubregionData(filterSubRegionData);
    setFilterCountriesData(filterSubRegionData);
    setShowFilter((prev) => ({...prev , subRegion : !prev.subRegion}));
  }


  function handleSortHelper(data, selectedWhich){
    let result;
      if(selectedWhich == 'Ascending'){
        result = data.sort((firstCountry, secondCountry)=> {
          if(firstCountry.population && secondCountry.population){
           return firstCountry.population- secondCountry.population;
          }
        });
      }else if(selectedWhich == 'Descending'){
        result = data.sort((firstCountry, secondCountry)=> {
          if(firstCountry.population && secondCountry.population){
          return  secondCountry.population - firstCountry.population;
          }
        });
      }
      setFilterCountriesData(result);
  }

  const handleSort =(e)=>{
    const selectedWhich = e.target.innerText;
    console.log(selectedWhich,regionName);
    setSortAreaWhich('');
    if(regionName.length >0){
      handleSortHelper(regionData, selectedWhich);
    }else if(subRegionName.length>0 && regionName.length >0){
      handleSortHelper(subRegionData, selectedWhich);
    }else{
      handleSortHelper(allCountries, selectedWhich);
    }
    setShowFilter((prev) => ({...prev , sort : !prev.sort}));
    setSortPopulationWhich(selectedWhich);
  }

  function handleSortAreaHelper(data, selectWhich){
    let result;
    if(selectWhich == 'Ascending'){
      result = data.sort((firstCountry, secondCountry)=> {
        if(firstCountry.area && secondCountry.area){
         return firstCountry.area- secondCountry.area;
        }
      });
    }else if(selectWhich == 'Descending'){
      result = data.sort((firstCountry, secondCountry)=> {
        if(firstCountry.area && secondCountry.area){
        return  secondCountry.area - firstCountry.area;
        }
      });
    }
    setFilterCountriesData(result);
  }

  const handleSortArea =(e) =>{
    const selectedArea = e.target.innerText;
    console.log(selectedArea,regionName);
    setSortPopulationWhich('');
    if(regionName.length >0){
      handleSortAreaHelper(regionData, selectedArea);
    }else if(subRegionName.length>0 && regionName.length >0){
      handleSortAreaHelper(subRegionData, selectedArea);
    }else{
      handleSortAreaHelper(allCountries, selectedArea);
    }

    setShowFilter((prev) => ({...prev , sortArea : !prev.sortArea}));
    setSortAreaWhich(selectedArea);
  }


  const fetchData =() =>{
    if (countriesData && countriesData.length > 0) {
      setAllCountries(countriesData);
      setFilterCountriesData(countriesData);
  
      const regionNames = countriesData.reduce((regionNames, eachCountry) => {
        if (!regionNames.includes(eachCountry.region)) {
          regionNames.push(eachCountry.region);
        }
        return regionNames;
      }, []);
  
      setFilterRegionNames(regionNames);
    }
  }

  useEffect(() => {
      fetchData();
  }, [countriesData]);

  const sortAscOrDesc =['Ascending', 'Descending'];
  const sortArea =['Ascending', 'Descending'];

  return (
   <section className={`min-h-screen bg-[#fafafa] mt-[4px] px-4 dark:bg-[#202d36] dark:text-white`}>
    <section className="pt-12 flex flex-col gap-12 md:gap-12 md:px-20">
     <section className="relative h-auto flex flex-col  gap-8 md:gap-12 md:flex-row md:justify-between ">
        <IoSearchOutline className="w-[25px] h-[25px] absolute top-[3%] md:top-[25%] left-[5%] md:left-[2%]"/>
        <input  type="text" value={inputText}  placeholder="Search for a country..." className="select-none w-full md:w-4/12 h-[60px] p-4 pl-24 shadow-md rounded-md dark:bg-[#2b3743] dark:text-white md:w-4/12" onChange={handleInput}/>
        <section className="w-1/2 md:w-4/12 xl:w-2/12 h-auto flex flex-col gap-1 dark:bg-[#2b3642] relative select-none rounded-md">
        <div className="flex gap-2 justify-between items-center shadow-lg h-10 px-4 py-8 rounded-md dark:bg-[#2b3642] bg-white cursor-pointer" onClick={() => setShowFilter((prev) => ({...prev, sortArea : !prev.sortArea}))}>
            <div className="text-sm md:text-[16px]" >{sortAreaWhich.length >0 ? sortAreaWhich : "Area"}</div>
            <div>
              {showFilter.sortArea ? (
                <FaChevronDown size={15} />   
              ) : (
                <FaChevronUp size={15} />
              )}
            </div>
          </div>
          {showFilter.sortArea && (
            <div className="absolute top-full mt-1 left-0 w-full px-4 py-2 gap-2 bg-white shadow-md rounded-lg dark:bg-[#2b3642] z-1">
              {sortArea.map((region) => (
                <div
                  key={region}
                  className="cursor-pointer dark:hover:bg-gray-800 p-2 hover:bg-gray-100" onClick={handleSortArea}
                >
                  {region}
                </div>
              ))}
            </div>
          )}
        </section>
        <section className="w-1/2 md:w-4/12 xl:w-2/12 h-auto flex flex-col gap-1 dark:bg-[#2b3642] relative select-none rounded-md">
        <div className="flex gap-2 justify-between items-center shadow-lg h-10 px-4 py-8 rounded-md dark:bg-[#2b3642] bg-white cursor-pointer" onClick={() => setShowFilter((prev) => ({...prev, sort : !prev.sort}))}>
            <div className="text-sm md:text-[16px]" >{sortPopulationWhich.length >0 ? sortPopulationWhich : "Population"}</div>
            <div>
              {showFilter.sort ? (
                <FaChevronDown size={15} />   
              ) : (
                <FaChevronUp size={15} />
              )}
            </div>
          </div>
          {showFilter.sort && (
            <div className="absolute top-full mt-1 left-0 w-full px-4 py-2 gap-2 bg-white shadow-md rounded-lg dark:bg-[#2b3642] z-1">
              {sortAscOrDesc.map((region) => (
                <div
                  key={region}
                  className="cursor-pointer dark:hover:bg-gray-800 p-2 hover:bg-gray-100" onClick={handleSort}
                >
                  {region}
                </div>
              ))}
            </div>
          )}
        </section>
        <section className="w-1/2 md:w-4/12 xl:w-2/12 h-auto flex flex-col gap-1 dark:bg-[#2b3642] relative select-none rounded-md">
        <div className={`flex gap-2 justify-between items-center shadow-lg h-10 px-4 py-8 rounded-md dark:bg-[#2b3642] bg-white ${regionName.length>0 ? 'cursor-pointer' : 'cursor-not-allowed'}`}
         onClick={() => {
          if(regionName.length==0){
            return;
          }
          setShowFilter((prev) => ({...prev, subRegion : !prev.subRegion}))
         }}>
            <div className="text-sm md:text-[16px]" >{subRegionName.length >0 ? subRegionName : "Filter by SubRegion"}</div>
            <div>
              {showFilter.subRegion  ? (
                <FaChevronDown size={15} />   
              ) : (
                <FaChevronUp size={15} />
              )}
            </div>
          </div>
          {showFilter.subRegion && (
            <div className="absolute top-full mt-1 left-0 w-full px-4 py-2 gap-2 bg-white shadow-md rounded-lg dark:bg-[#2b3642] z-1">
              {subRegionNames.map((region) => (
                <div
                  key={region}
                  className="cursor-pointer dark:hover:bg-gray-800 p-2 hover:bg-gray-100" onClick={handleSubRegionSearch}
                >
                  {region}
                </div>
              ))}
            </div>
          )}
        </section>
        <section className="w-1/2 md:w-4/12 xl:w-2/12 h-auto flex flex-col gap-1 dark:bg-[#2b3642] relative select-none rounded-md">
        <div className="flex gap-2 justify-between items-center shadow-lg h-10 px-4 py-8 rounded-md dark:bg-[#2b3642] bg-white cursor-pointer" onClick={() => setShowFilter((prev) => ({...prev, region : !prev.region}))}>
            <div className="text-sm md:text-[16px]" >{regionName.length >0 ? regionName : "Filter by Region"}</div>
            <div>
              {showFilter.region ? (
                <FaChevronDown size={15} />   
              ) : (
                <FaChevronUp size={15} />
              )}
            </div>
          </div>
          {showFilter.region && (
            <div className="absolute top-full mt-1 left-0 w-full px-4 py-2 gap-2 bg-white shadow-md rounded-lg dark:bg-[#2b3642] z-1">
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
        </section>
     </section>
     
        <section className="flex justify-center gap-12 md:flex-row flex-wrap md:gap-12 md:justify-between md:p-auto">
            {
              allCountries.length ==0 ? <Loading /> : filterCountriesData.length ==0 ? <NoDataFound />
              :filterCountriesData.map((eachCountry)=>{
                return  (<Link to={`/country/${eachCountry?.ccn3}`} key={eachCountry?.name?.common}>
                   <EachCountry eachCountry={eachCountry}/>
                </Link>)
               
              })

            }
        </section>
    </section>
   </section>
  )
}

export default HomePage

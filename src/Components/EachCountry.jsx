
const EachCountry = ({eachCountry}) => {
  return (
    <section className="w-[350px] h-[400px] margin-auto shadow-lg dark:shadow-[#2b3743] rounded-md overflow-hidden">
      <img src={eachCountry?.flags?.png} className="w-full h-1/2"/>
      <section className="w-full pt-4 pl-6 flex flex-col gap-2">
        <div className="font-bold mb-2 text-lg">{eachCountry?.name?.common}</div>
        <div className="text-sm"><span className="font-bold">Population : </span><span className="text-gray-500">{eachCountry?.population}</span></div>
        <div className="text-sm"><span className="font-bold">Region : </span><span className="text-gray-500">{eachCountry?.region}</span></div>
        <div className="text-sm"><span className="font-bold">Capital : </span><span className="text-gray-500">{eachCountry?.capital}</span></div>
        <div className="text-sm"><span className="font-bold">Area : </span><span className="text-gray-500">{eachCountry?.area}</span></div>
      </section>
    </section>
  )
}

export default EachCountry
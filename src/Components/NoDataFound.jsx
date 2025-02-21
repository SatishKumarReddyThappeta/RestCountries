import { RxExclamationTriangle } from "react-icons/rx";
const NoDataFound = () => {
  return (
    <section className="flex flex-col items-center pt-32 w-screen overflow-hidden">
        <RxExclamationTriangle className="dark:text-white text-6xl"/>
        <div className="text-2xl font-bold">No Matching Results</div>
    </section>
  )
}

export default NoDataFound
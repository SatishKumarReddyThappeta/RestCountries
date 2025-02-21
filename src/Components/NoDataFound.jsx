import { RxExclamationTriangle } from "react-icons/rx";
const NoDataFound = () => {
  return (
    <div className="flex flex-col items-center pt-32 w-screen overflow-hidden">
        <RxExclamationTriangle className="dark:text-white text-6xl"/>
        <div className="text-2xl font-bold">No Matching Results</div>
    </div>
  )
}

export default NoDataFound
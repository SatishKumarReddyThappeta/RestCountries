
const Loading = () => {
  return (

    <section className="w-screen flex justify-center pt-12">
        <div class="animate-spin inline-block size-10 border-[4px] border-current border-t-transparent text-gray-800 rounded-full dark:text-white" role="status" aria-label="loading">
            <span class="sr-only">Loading...</span>
        </div>
    </section>

  )
}

export default Loading
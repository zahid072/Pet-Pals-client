import React from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <div className="h-screen -mt-10">
    <Helmet>
      <meta charSet="utf-8" />
      <title>Error!!!</title>
      <link rel="canonical" href="http://mysite.com/example" />
    </Helmet>
  <div className="bg-cover bg-center size-[700px] mx-auto flex justify-center items-end">
    <img src="https://i.ibb.co/D4CKSnx/404-page.gif" alt="" />
    <div className=" absolute">
      <button className=" mx-auto px-6 py-3 rounded-lg bg-emerald-500 flex items-center">
        <Link className="underline text-black font-bold text-xl" to={"/"}>
          {"< Back Home"}
        </Link>
      </button>
    </div>
  </div>
</div>
  )
}

export default ErrorPage

import type { NextPage } from 'next'
import Head from 'next/head'
import LandingPage from "./landingPage";
import "bootstrap/dist/css/bootstrap.min.css";


const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>RHub</title>
      </Head>
      <LandingPage />
    </div>
  )
}

export default Home

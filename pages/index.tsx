import type { NextPage } from 'next'
import Head from "next/head";
import Image from "next/image";
import logo from "../images/logo.png";

const Home: NextPage = () => {
  return (
    <div style={{ marginRight: "auto", marginLeft: "auto", maxWidth: 960 }}>
      <Head>
        <title>Brewhaus Bourbon Raffle</title>
        <meta name="description" content="Fundraiser for Brewhaus Dog Bones" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header style={{ marginTop: 20, marginBottom: 20 }}>
        <Image src={logo} alt="Brewhaus Dog Bones Logo" />
      </header>

      <main>
        <h1>Brewhaus Bourbon Raffle!</h1>
      </main>

      <footer
        style={{
          position: "fixed",
          left: 0,
          bottom: 0,
          width: "100%",
          textAlign: "center",
          marginBottom: 40,
        }}
      >
        Brewhaus Dog Bones 2022
      </footer>
    </div>
  );
};

export default Home

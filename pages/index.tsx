import type { NextPage } from 'next'
import Head from "next/head";
import Image from "next/image";
import logo from "../images/logo.png";
import Client, { Product } from "shopify-buy";
import { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import blantons from "../images/bourbon-blantons.jpeg";
import eagle from "../images/bourbon-eagle.jpeg";
import knob from "../images/bourbon-knob.jpeg";
import oldVanWinkle from "../images/bourbon-old-van-winkle.jpeg";
import stag from "../images/bourbon-stag.jpeg";
import taylor from "../images/bourbon-taylor.jpeg";
import turkey from "../images/bourbon-turkey.jpeg";
import vanWinkle from "../images/bourbon-van-winkle.jpeg";
import weller from "../images/bourbon-weller.jpeg";
import woodford from "../images/bourbon-woodford.jpeg";

const client = Client.buildClient({
  domain: "brewhaus-bourbon-raffle-test.myshopify.com",
  storefrontAccessToken: "bb5a0f9a3f9a953c5bb98914b66fdc4a",
});

const Home: NextPage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      const newProducts = await client.product.fetchAll();
      setProducts(newProducts);
    };
    getProducts();
  }, []);

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
        <Carousel
          autoPlay
          showStatus={false}
          showArrows
          infiniteLoop
          showThumbs={false}
        >
          {[
            blantons,
            eagle,
            knob,
            oldVanWinkle,
            stag,
            taylor,
            turkey,
            vanWinkle,
            weller,
            woodford,
          ].map((bourbon, key) => (
            <Image key={key} src={bourbon} alt="Bourbon pics for auction" />
          ))}
        </Carousel>
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

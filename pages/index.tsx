import type { NextPage } from 'next'
import Head from "next/head";
import Image from "next/image";
import logo from "../images/logo.png";
import Client, { Product } from "shopify-buy";
import { useEffect, useState } from "react";
import { Carousel } from "../components/carousel";
import { InputNumber, Button, Divider, Layout, Typography } from "antd";
import { Content, Footer, Header } from "antd/lib/layout/layout";
import { useMediaQuery } from "react-responsive";

const client = Client.buildClient({
  domain: "brewhaus-bourbon-raffle-test.myshopify.com",
  storefrontAccessToken: "bb5a0f9a3f9a953c5bb98914b66fdc4a",
});

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const getPrice = (product: any) =>
  formatter.format(product.variants[0].price.amount);

const Home: NextPage = () => {
  const [raffleTicket, setRaffleTicket] = useState<Product>();
  const [purchaseCount, setPurchaseCount] = useState<number>(0);
  const [checkoutId, setCheckoutId] = useState<string>();
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  useEffect(() => {
    const getProducts = async () => {
      const newProducts = await client.product.fetchAll();
      setRaffleTicket(newProducts[0]);
      const newCheckout = await client.checkout.create();
      setCheckoutId(newCheckout.id.toString());
    };
    getProducts();
  }, []);

  const handleBuyNow = async () => {
    const newItem = [
      {
        variantId: raffleTicket?.variants[0].id ?? "",
        quantity: purchaseCount,
      },
    ];
    await client.checkout.addLineItems(checkoutId ?? "", newItem);
    const checkout = await client.checkout.fetch(checkoutId ?? "");
    window.location.href = checkout.webUrl;
  };

  return (
    <Layout>
      <div>
        <Head>
          <title>Brewhaus Bourbon Raffle</title>
          <meta
            name="description"
            content="Fundraiser for Brewhaus Dog Bones"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header
          style={{
            minHeight: isTabletOrMobile ? 110 : 150,
            padding: 0,
          }}
        >
          <div
            style={{
              marginRight: "auto",
              marginLeft: "auto",
              maxWidth: 960,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-end",
              paddingTop: 10,
              paddingLeft: isTabletOrMobile ? 10 : 0,
              paddingRight: isTabletOrMobile ? 10 : 0,
            }}
          >
            <Image
              src={logo}
              alt="Brewhaus Dog Bones Logo"
              height={120}
              width={150}
            />
            <Typography.Title
              level={isTabletOrMobile ? 4 : 2}
              style={{
                color: "white",
                marginBottom: 0,
                marginLeft: 10,
                textAlign: "right",
              }}
            >
              Brewhaus Dog Bones Bourbon Raffle 2022!
            </Typography.Title>
          </div>
        </Header>

        <Content>
          <div
            style={{
              marginRight: "auto",
              marginLeft: "auto",
              maxWidth: 960,
            }}
          >
            <Carousel />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                marginTop: 20,
              }}
            >
              {raffleTicket && (
                <div>
                  <div>
                    <b>Price per ticket:</b> {getPrice(raffleTicket)}
                  </div>
                  <div style={{ flexDirection: "row" }}>
                    <b>Quantity:</b>
                    <InputNumber
                      style={{ marginLeft: 10 }}
                      min={0}
                      onChange={(count) => {
                        setPurchaseCount(count as number);
                      }}
                      value={purchaseCount}
                    />
                  </div>
                </div>
              )}
              <Button
                type="primary"
                size="large"
                onClick={handleBuyNow}
                disabled={purchaseCount < 1}
              >
                Buy Now
              </Button>
            </div>
          </div>
        </Content>

        <Footer
          style={{
            textAlign: "center",
          }}
        >
          <Divider />
          Brewhaus Dog Bones 2022
        </Footer>
      </div>
    </Layout>
  );
};

export default Home

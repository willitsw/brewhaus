import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useMediaQuery } from "react-responsive";
import { Affix, Layout, Menu, Typography } from "antd";
import Image from "next/image";
import logo from "../../images/logo.png";
import Loading from "../loader";
import Link from "next/link";
import constants from "../../constants";
interface PageProps {
  title?: string;
  metaDescription?: string;
  children: React.ReactNode;
  isPageLoading?: boolean;
}

const Page = ({
  title,
  metaDescription,
  children,
  isPageLoading = false,
}: PageProps) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const isTabletOrMobile = useMediaQuery({
    query: `(max-width: ${constants.maxSiteWidth}px)`,
  });

  useEffect(() => {
    setIsSmallScreen(isTabletOrMobile);
  }, [isTabletOrMobile]);

  return (
    <>
      <Head>
        <title>{title ? title : "Brewhaus Dog Bones"}</title>
        <meta
          name="description"
          content={
            metaDescription ? metaDescription : "Welcome to Brewhaus Dog Bones"
          }
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout
        style={{
          minHeight: "100vh",
          minWidth: isSmallScreen ? constants.maxSiteWidth : 0,
        }}
      >
        <Affix offsetTop={0}>
          <Layout.Header
          // style={{ minWidth: isSmallScreen ? constants.maxSiteWidth : 0 }}
          >
            <div
              style={{
                marginRight: "auto",
                marginLeft: "auto",
                maxWidth: constants.maxSiteWidth,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingLeft: 10,
                paddingRight: 10,
              }}
            >
              <Image
                src={logo}
                alt="Brewhaus Dog Bones Logo"
                height={50}
                width={65}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              >
                <Menu
                  theme="dark"
                  mode="horizontal"
                  defaultSelectedKeys={["2"]}
                  items={[
                    { key: "home", label: "Home" },
                    { key: "shop", label: "Shop" },
                    {
                      key: "story",
                      label: "Story",
                      children: [
                        {
                          key: "the-brewhaus-dog-treat",
                          label: "The Brewhaus Dog Treat",
                        },
                      ],
                    },
                    { key: "brew-crew", label: "Brew Crew" },
                    { key: "where-to-buy", label: "Where to Buy" },
                    { key: "media", label: "Media" },
                    { key: "contact", label: "Contact" },
                  ]}
                />
                <div style={{ color: "white" }}>Cart</div>
              </div>
            </div>
          </Layout.Header>
        </Affix>
        <Layout.Content
          style={{
            minHeight: "90vh",
            maxWidth: constants.maxSiteWidth,
            // minWidth: isSmallScreen ? constants.maxSiteWidth : 0,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <Loading isLoading={isPageLoading}>{children}</Loading>
        </Layout.Content>
        <Layout.Footer
          style={{
            textAlign: "center",
          }}
        >
          <b>
            Brewhaus Bakery & Dog Bones
            <br />
            1623 Burney Lane Cincinnati OH 45230
          </b>
          <br />
          Non-profit 501(c)3 Charity
          <br />
          Serving Individuals With A Disability; EIN 47-1534402
          <br />
          <br />
          Please contact Brewhaus Bakery & Dog Bones for additional information,
          questions and/or concerns!
          <br />
          <Link href="mailto:lisa@brewhausdogbones.com">
            lisa@brewhausdogbones.com
          </Link>{" "}
          513.520.0310{" "}
          <Link href="http://www.brewhausdogbones.com">
            brewhausdogbones.com
          </Link>
        </Layout.Footer>
      </Layout>
    </>
  );
};

export default Page;

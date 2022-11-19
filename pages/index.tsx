/* eslint-disable react/no-unescaped-entities */
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import logo from "../images/logo.png";
import Client, { LineItemToAdd } from "shopify-buy";
import React, { useEffect, useState } from "react";
import { CarouselBourbon } from "../components/carousel-bourbon";
import { InputNumber, Button, Divider, Layout, Typography, Modal } from "antd";
import { Content, Footer, Header } from "antd/lib/layout/layout";
import { useMediaQuery } from "react-responsive";
import Loading from "../components/loader";
import allBourbon from "../images/bourbon-all.jpg";
import { CarouselCrew } from "../components/carousel-crew";
import Lot from "../components/lot";
import Link from "next/link";

const client = Client.buildClient({
  domain: "brewhaus-dog-bones.myshopify.com",
  storefrontAccessToken: "faf16306f4b8ed42c5c15fe00eb7fbed",
});

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const getPrice = (price: any) => formatter.format(price.amount);

const Home: NextPage = () => {
  const [checkoutId, setCheckoutId] = useState<string>("");
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const [is21, setIs21] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showAgreementModal, setShowAgreementModal] = useState<boolean>(false);
  const [cart, setCart] = useState<LineItemToAdd[]>([]);
  const [products, setProducts] = useState<Client.Product[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      const newProducts = await client.product.fetchAll();
      setProducts(newProducts);
      const checkoutItems: LineItemToAdd[] = newProducts.map((product) => ({
        variantId: product.variants[0].id,
        quantity: 0,
      }));
      setCart(checkoutItems);
      const newCheckout = await client.checkout.create();
      setCheckoutId(newCheckout.id.toString());
      setIsLoading(false);
    };
    getProducts();
  }, []);

  const handleBuyNow = async () => {
    await client.checkout.addLineItems(
      checkoutId,
      cart.filter((item) => item.quantity > 0)
    );
    const checkout = await client.checkout.fetch(checkoutId);
    window.location.href = checkout.webUrl;
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
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
            minHeight: isTabletOrMobile ? 100 : 150,
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
              Brewhaus Dog Bones Bourbon Raffle 2022
            </Typography.Title>
          </div>
        </Header>

        <Content style={{ minHeight: "90vh" }}>
          <Loading isLoading={isLoading}>
            <div
              style={{
                marginRight: "auto",
                marginLeft: "auto",
                maxWidth: 960,
              }}
            >
              <Typography.Title
                style={{ textAlign: "center", marginTop: 20 }}
                level={1}
              >
                WE NEED YOUR HELP THIS HOLIDAY SEASON!
              </Typography.Title>
              <Typography.Title
                style={{ textAlign: "center", marginTop: 20, color: "#e05353" }}
                level={3}
              >
                Brewhaus Bakery & Dog Bones Premium Bourbon Raffle Fundraiser
              </Typography.Title>
              <Typography.Paragraph
                style={{
                  paddingLeft: 10,
                  paddingRight: 10,
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                ALL proceeds benefit our non-profit bakery organization
                providing training & employment for individuals with a
                disability that promotes independence and builds confidence!{" "}
              </Typography.Paragraph>
              <CarouselCrew />
              <Typography.Paragraph
                style={{
                  paddingLeft: 10,
                  paddingRight: 10,
                  textAlign: "center",
                  paddingTop: 20,
                }}
              >
                Your ticket purchase this holiday season helps to maintain our
                commercial bake space, provide employment and training
                opportunities for individuals with a disability, alongside our
                wonderful support staff. We foster a creative, inclusive
                environment with opportunities for additional skill development
                and job growth.{" "}
                <a href="testimonials.pdf" download>
                  Click here
                </a>{" "}
                to view some testimonials from our bakers!
              </Typography.Paragraph>
              <Typography.Title
                style={{
                  textAlign: "center",
                  paddingLeft: 10,
                  paddingRight: 10,
                  marginTop: 20,
                  color: "#e05353",
                  marginBottom: 20,
                }}
                level={3}
              >
                Help us be a catalyst for both personal & community impact and
                change!
              </Typography.Title>
              <CarouselBourbon />
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                  alignItems: "center",
                  marginTop: 20,
                  flexWrap: "wrap",
                }}
              >
                {products.map((product, idx) => (
                  <div
                    key={idx}
                    style={{
                      width: 320,
                      marginTop: 20,
                      marginBottom: 20,
                      textAlign: "center",
                    }}
                  >
                    <div style={{ marginBottom: 10 }}>
                      <b style={{ color: "#e05353" }}>{product.description}</b>
                      <br />
                      {getPrice(product.variants[0].price)}
                    </div>
                    <div style={{ flexDirection: "row" }}>
                      <b>Quantity:</b>
                      <InputNumber
                        style={{ marginLeft: 10 }}
                        min={0}
                        onChange={(count) => {
                          const cartCopy = [...cart];
                          const indexToUpdate = cartCopy.findIndex(
                            (c) => c.variantId === product.variants[0].id
                          );
                          cartCopy[indexToUpdate].quantity = count ?? 0;
                          setCart(cartCopy);
                        }}
                        value={cart[idx].quantity}
                      />
                    </div>
                  </div>
                ))}
                <Button
                  type="primary"
                  size="large"
                  style={{ marginTop: 20 }}
                  onClick={() => setShowAgreementModal(true)}
                  disabled={cart.find((c) => c.quantity > 0) === undefined}
                >
                  Buy Now
                </Button>
              </div>
              <Typography.Title
                level={2}
                style={{ textAlign: "center", marginTop: 20 }}
              >
                Holiday Reception & Raffle Drawing Sunday, December 18th at 2 pm
              </Typography.Title>
              <Divider />
              <Typography.Title
                level={2}
                style={{ textAlign: "center", color: "#e05353" }}
              >
                Bourbon Lot Descriptions
              </Typography.Title>
              <Lot
                number={1}
                heading="Buy your ticket, and hope it’s pulled for a Pappy Van
                    Winkle’s 10 year Bourbon! Old Rip Van Winkle 10 Year
                    Kentucky Straight Bourbon Whiskey:"
                text='Old Rip Van Winkle Handmade Bourbon. This fine whiskey has as
                    pleasant a taste as any whiskey around. The 10 full years of
                    aging combine nicely with its 45% apy (90 proof). A sweet
                    vanilla nose with caramel, pecan and oak wood. Smooth, mellow
                    flavor consisting of robust wheat, cherries and oak. Features
                    a long, smoky wheat finish with hints of fruit, spice and oak
                    tannins. This bourbon has a "rich, plush texture." If you know
                    bourbon, you know a Pappy needs to be on your shelf!'
              />
              <Lot
                number={2}
                heading="Pappy Van Winkle's 12 Year Lot B
                Van Winkle Special Reserve 12 Year Kentucky Straight Bourbon Whiskey"
                text="Van Winkle Special Reserve is the perfect combination of age and proof in a bourbon. This sweet, full-bodied whiskey has been described by some as “nectar.” The 12 years of aging and medium proof seem to be just right in creating a very pleasant drink of American whiskey. Enjoy notes of caramel, nuts, and brown spices with a lengthy, enveloping finish. It’s an outrageously smooth and decadent bourbon that might be your next party bottle!"
              />
              <Lot
                number={3}
                heading="A Trifecta of Perfection in an EH Taylor Triple Treat: 3 bottles; 750 ml each bottle"
                text="Colonel Edmund Haynes Taylor, Jr was a visionary in the whiskey world with a mind for distilling that was years ahead of its time. He founded a world class Distillery, made advancements to the industry, and fought for the purity and legitimacy of bourbon, gaining him the title of the “Father of the Modern Bourbon Industry.” This lot has the best of everything! Colonel E.H. Taylor Small Batch, Colonel E.H. Taylor Barrel Proof (uncut & unfiltered), and Colonel E.H. Taylor Single Barrel.
                "
              />
              <Lot
                number={4}
                heading="A Double Dip of Eagle Rare!"
                text="Eagle Rare Kentucky Straight Bourbon Whiskey is carefully aged for no less than ten years making it a smooth and tasty whiskey. The rareness of this great breed of bourbon is evident in its complex aroma, as well as the smooth and lingering taste. Eagle Rare is a bourbon that lives up to its name with its lofty, distinctive taste experience.
                Eagle Rare Bourbon has a nose of complex aromas of toffee, hints of orange peel, herbs, honey, leather and oak  with notes of candied almonds and very rich cocoa. The finish is dry and lingering making Eagle Rare bourbon a whiskey you won’t forget! One for you and one for a friend!
                "
              />
              <Lot
                number={5}
                heading="A Weller Lucky 4 Pack: Hope you win this special lot! Weller Special Reserve, Weller 12 Year, Weller Full Proof, Weller Antique 107"
                text="The ultimate collection of fine American bourbons - from the W.L. Weller part of the award-winning Buffalo Trace Distillery- makes a perfect addition for the bourbon connoisseur. Each of these wheated bourbons offers distinct characteristics for the most distinguishing palate. Split a ticket with friends and have a special tasting when you win!"
              />
              <Lot
                number={6}
                heading="Woodford Reserve Bourbon Duo The Woodford Unicorn! A Double Double Oaked Kentucky Straight Bourbon Whiskey, 375 ml + Master’s Collection Woodford Reserve Five Malt Stouted Mash Kentucky Malt Whiskey;"
                text="“Double Double Oaked has such a cult following, which makes it very difficult for consumers to get their hands on it,” said Master Distiller Chris Morris. This bourbon is the result of finishing fully matured Woodford Reserve Double Oaked for an additional year in a second, heavily toasted, lightly charred, new oak barrel.The extra year in the barrel creates a bourbon that is said to be distinctly spicier than its original counterpart, which is known for its sweeter taste and finish. Double Double Oaked is 90.4 proof. Limited Series No. 17; 750 ml; 90.4 proof; 45.2% abv. This unique release is made from a mix of five malts that is then triple-distilled. A bourbon aroma of  toasted multigrain bread with subtle notes of caramel and chocolate. Rich flavor while still feeling light. Flavors of biscuit, toffee, and barley are present and complemented by a slight bitter citrus quality. Imagine candied malted barley! Extremely hard to find!"
              />
              <Lot
                number={7}
                heading="Blanton’s Twosome: The Original Single Barrel Bourbon Whiskey;"
                text="Bottle 1: Dumped on 11-12-20 From Barrel No. 669; Warehouse H on Rick No. 1; 750 ml Bottle 2: Dumped on 11-20-20 From Barrel No. 824; Warehouse H on Rick No. 2; 375 ml Blanton's Original Single Barrel Bourbon Whiskey is still aged in the same section of Warehouse H as Blanton's Private Reserve was over 50 years ago. Made from the high-rye Buffalo Trace mash bill of corn, rye, and malted barley making it one of the most highly sought-after American bourbons with a deep, satisfying nose of nutmeg and spices. Additionally, powerful dry vanilla notes in harmony with hints of honey amid strong caramel and corn make this a top shelf bourbon! Bottled at 46.5% abv."
              />
              <Image src={allBourbon} alt="All bourbons for raffle" />
            </div>
            <Typography.Title
              level={5}
              style={{ textAlign: "center", marginTop: 20 }}
            >
              Maximum of 300 tickets sold
            </Typography.Title>
            <Typography.Title
              style={{ textAlign: "center", marginTop: 20, color: "#e05353" }}
              level={2}
            >
              Support our mission with a raffle ticket purchase and take a
              chance to win a rare bourbon!
            </Typography.Title>
            <Modal
              title="Are you 21 years old?"
              open={!is21}
              onOk={() => setIs21(true)}
              onCancel={() => (window.location.href = "https://www.google.com")}
              okText="Yes, Proceed!"
              cancelText="No"
              closable={false}
            >
              <p>You must be 21 years old to enter this site.</p>
            </Modal>
            <Modal
              title={
                <>
                  Brewhaus Bakery & Dog Bones:
                  <br />
                  Holiday Bourbon Raffle Official Rules & Regulations
                </>
              }
              width={800}
              open={showAgreementModal}
              onOk={() => {
                setShowAgreementModal(false);
                setIsLoading(true);
                handleBuyNow();
              }}
              onCancel={() => setShowAgreementModal(false)}
              okText="I Agree to the Above Terms"
              cancelText="I do not Agree"
            >
              <>
                <Typography.Title level={5}>Official Rules</Typography.Title>
                <Typography.Paragraph>
                  By participating in the Brewhaus Bakery & Dog Bones Holiday
                  Bourbon Raffle, you agree to these official rules which act as
                  a contract between Brewhaus Bakery and “ticket purchaser(s)”.
                  These Official Rules & Regulations (the “Rules”) govern the
                  conduct of the Brewhaus Bakery & Dog Bones Holiday Bourbon
                  Raffle (the “Raffle”) and, together with the decisions of
                  Brewhaus Bakery, are binding on everyone who purchases a
                  Raffle ticket and/or who is named on a Raffle ticket. The
                  Raffle is a fundraising activity conducted by Brewhaus Bakery,
                  EIN 47-1534402. These rules may not be waived, modified, or
                  supplemented unless waiver, modification, or supplementation
                  is made in writing by Brewhaus Bakery. Must be 21 years of age
                  or older to enter raffle drawing and must reside in the
                  contiguous 48 US States. Drawing to be conducted Sunday, Dec
                  18, 2022, except this date and all other dates stated in the
                  Rules may be extended at the absolute discretion of Brewhaus
                  Bakery and winners to be announced at that time. In the event
                  that the Raffle is postponed, all reasonable efforts will be
                  made to notify ticket holders of the new drawing date. Online
                  ticket orders MUST be received by 12 noon on Saturday Dec 17,
                  2022. Tickets may be purchased online, in person and by mail
                  prior to this date and time. The drawing will be conducted
                  under the supervision of Brewhaus Bakery and winning tickets
                  will be drawn at random from a drum containing all eligible
                  Raffle tickets and will be held at Brewhaus Bakery 1623 Burney
                  Lane, Cincinnati OH 45230 and on Facebook and Instagram
                  starting at 2 pm Dec 18, 2022. The event is viewable to the
                  public and all are welcome to attend although ticket holders
                  do not have to be present to win.
                </Typography.Paragraph>
                <Typography.Title level={5}>Tickets</Typography.Title>
                <Typography.Paragraph>
                  The price per ticket is $100.00. A maximum of 300 tickets will
                  be sold. If fewer than 300 tickets are sold, Brewhaus Bakery
                  reserves the right, in its sole discretion, to postpone the
                  date of the drawing until a date that is within (7) days from
                  the date on which the maximum number of tickets are sold, or
                  proceed with the drawing, or cancel the Raffle and refund
                  ticket purchases. You may buy as many tickets as you wish,
                  subject to availability, until a maximum number of 300 tickets
                  are sold. Each raffle ticket is a separate and equal chance to
                  win one of the 7 prize lots available, each lot containing one
                  or more bourbon(s) per lot. More than one person may share in
                  the raffle ticket purchase, but all names must be listed on
                  the ticket, and the first name listed shall be deemed ticket
                  holder and will be called at drawing. Tickets are not
                  transferable once purchased. No organization name should be
                  placed on the ticket. You can win more than one prize if you
                  have purchased multiple tickets. An email receipt for your
                  purchase of raffle ticket(s) will be sent immediately.
                  Numbered raffle tickets will be emailed within 3 days of your
                  purchase; physical raffle tickets will not be mailed but kept
                  for the drawing. Ticket orders must include valid credit card
                  information to be eligible for purchase. If the credit card
                  transaction is denied for any reason, no ticket shall be sold
                  and the ticket purchase request is null and void. The printed
                  ticket(s) containing the purchaser’s name, ticket number and
                  contact information, will be placed in a secure location at
                  the offices of Brewhaus Bakery until time of drawing. All
                  proceeds benefit Brewhaus Bakery & Dog Bones, an Ohio
                  501(c)(3) non-profit organization. By purchasing a ticket,
                  each ticket holder releases Brewhaus Bakery & Brewhaus Bakery
                  Board of Directors, any and all Officers, Employees,
                  Volunteers and any other Agents acting on behalf of Brewhaus
                  Bakery from any and all liability with respect to the Raffle,
                  including but not limited to the selection process and the
                  interpretation and application of the Rules, and from any and
                  all liability for injuries, losses, or damages of any kind
                  caused by winning Prize or resulting from acceptance,
                  possession, use or misuse of the winning prize. Each ticket
                  holder agrees to indemnify and hold Brewhaus Bakery harmless
                  from any and all claims, losses, damages, rights, and actions
                  arising in connection with the winner’s acceptance of or use
                  of winning prize.
                </Typography.Paragraph>
                <Typography.Title level={5}>Refunds</Typography.Title>
                <Typography.Paragraph>
                  All raffle tickets sales are final and no refunds will be made
                  unless Raffle is canceled at the sole discretion of Brewhaus
                  Bakery. Brewhaus Bakery assumes no responsibility or liability
                  for lost, late, misdirected and/or non delivered email, mail,
                  or fax or other electronic or land messages, and/or any other
                  failure to receive orders or deliver receipts prior to the
                  drawing deadline. In no event can Brewhaus Bakery or their
                  respective directors, agents or employees, contractors,
                  advisors and or representatives be liable for any party for
                  any loss or injuries to earnings, profits, or goodwill, or for
                  any incidental, special, punitive or consequential damages
                  arising from any person or entity.
                </Typography.Paragraph>
                <Typography.Title level={5}>Eligibility</Typography.Title>
                <Typography.Paragraph>
                  Raffle is open to the general public, and{" "}
                  <strong>
                    ticket purchasers and the person named on the raffle ticket
                    must be at least 21 years of age at the time of purchase.
                  </strong>{" "}
                  Offer void where prohibited by law. In order for prize winners
                  to receive their prize, Brewhaus Bakery shall notify the
                  winner(s) verbally in person or by phone or in writing and the
                  winners shall claim their prize within thirty (30) days. If
                  the prize winner does not claim their prize within 30 days
                  after having been contacted, Brewhaus Bakery reserves the
                  right to draw another ticket from the remaining ticket pool.
                  The tickets shall remain under the control of Brewhaus Bakery
                  until another prize winner is identified and accepts the
                  prize. Brewhaus Bakery Employees, Advisors, Board Members, its
                  agents, consultants, attorneys, independent accounting firms,
                  spouses, and children living in the same household and any
                  other persons involved with the promotion of this Raffle are
                  not eligible for any and/all prizes. Ticket purchasers do not
                  need to attend Raffle to win. Drawing may be conducted by
                  Brewhaus Bakery staff, volunteers or Board Members and prizes
                  will be awarded in a random manner:
                </Typography.Paragraph>
                <Typography.Title level={5}>Prizes</Typography.Title>
                <Typography.Paragraph>
                  There are no substitutions for prizes.
                  <br />
                  There are 7 lots of bourbon(s) for the Brewhaus Bakery & Dog
                  Bones Holiday Bourbon Raffle:
                  <br />
                  <ul>
                    <li>
                      <strong>Lot 1: </strong>Old Rip Van Winkle 10 Year
                    </li>
                    <li>
                      <strong>Lot 2: </strong>Van Winkle Special Reserve 12 year
                      Lot B
                    </li>
                    <li>
                      <strong>Lot 3: </strong>EH Taylor Small Batch, EH Taylor
                      Single Barrel, EH Taylor Barrel Proof (uncut and
                      unfiltered); 3 bottles
                    </li>
                    <li>
                      <strong>Lot 4: </strong>Eagle Rare (aged 10 years); 2
                      identical bottles
                    </li>
                    <li>
                      <strong>Lot 5: </strong>Weller 4 Pack: Weller Special
                      Reserve, Weller 12 Year, Weller Full Proof, Weller Antique
                      107; 4 bottles
                    </li>
                    <li>
                      <strong>Lot 6: </strong>Blanton’s Original Single Barrel
                      Bourbon Whiskey: One bottle 750 ml; one bottle 375 ml; 2
                      bottles
                    </li>
                    <li>
                      <strong>Lot 7: </strong>Woodford Reserve: One750 ml Bottle
                      Master’s Collection Five- Malt Stouted Mash Kentucky Malt
                      Bourbon Whiskey; One Bottle 375 ml Double Double Oaked
                      Kentucky Straight Bourbon Whiskey; 2 bottles
                    </li>
                  </ul>
                </Typography.Paragraph>
                <Typography.Title level={5}>Prize Value</Typography.Title>
                <Typography.Paragraph>
                  The prize value is determined by the retail value of the
                  bourbon as mandated by The Ohio Liquor Controlled Price
                  Structure; the value of the prize(s) or any other value
                  determined by any federal or local state agency is for the
                  purpose of determining any income tax that may be due or
                  payable by each prize winner(s). Brewhaus Bakery understands
                  that the IRS position is that amounts paid for chances in
                  raffles, lotteries and/or similar drawings for valuable prizes
                  are not gifts and, consequently, do not qualify as deductible
                  charitable contributions. Therefore the purchase amount of
                  Raffle ticket(s) is not considered a tax deductible
                  purchase/donation. Brewhaus Bakery assumes no responsibility
                  for prize winner’s obligations at either/both state and
                  federal levels and suggests that you consult your tax advisor.
                  Ticket purchaser/prize winner(s) assume any and all
                  responsibility and tax liability associated with Raffle cost
                  and/or prize.
                </Typography.Paragraph>
                <Typography.Title level={5}>Prize Winner</Typography.Title>
                <Typography.Paragraph>
                  Winner notification will be made by telephone, email, US mail
                  and posted on our dedicated web page:{" "}
                  <a href="https://www.brewhausborbonraffle.com">
                    www.brewhausbourbonraffle.com
                  </a>
                  . Each winner will need to provide proper identification which
                  could include but is not limited to a state ID card, a
                  driver’s license, a passport or employment ID card to the
                  satisfaction of Brewhaus Bakery. All winners must pick up
                  their prize in person at the Brewhaus Bakery 1623 Burney Lane,
                  Cincinnati OH 45230. Bourbon cannot be shipped. A
                  representative will coordinate all the details and pick up
                  time of prize(s). Winner(s) agree to use of his/her/their
                  name, photograph and or videotape likeness and statements for
                  publicity purposes by Brewhaus Bakery and agree to sign a
                  publicity release without any liability or compensation.
                </Typography.Paragraph>
              </>
            </Modal>
          </Loading>
        </Content>

        <Footer
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
        </Footer>
      </div>
    </Layout>
  );
};

export default Home;

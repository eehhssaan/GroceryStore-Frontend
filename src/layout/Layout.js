import Head from "next/head";
import { ToastContainer } from "react-toastify";

//internal import
import Navbar from "@layout/navbar/Navbar";
import Footer from "@layout/footer/Footer";
import FooterTop from "@layout/footer/FooterTop";
import MobileFooter from "@layout/footer/MobileFooter";
import FeatureCard from "@component/feature-card/FeatureCard";
import NavBarTop from "./navbar/NavBarTop";

const Layout = ({ title, description, children }) => {
  return (
    <>
      <ToastContainer />
      <div className="font-sans">
        <Head>
          <title>
            {title
              ? `KachaBazar | ${title}`
              : "KachaBazar - React Grocery & Organic Food Store e-commerce Template"}
          </title>
          {description && <meta name="description" content={description} />}
          <link ref="icon" href="/favicon.png" />
          <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-5D69842');`,
          }}
        />
   
        </Head>
        {/* <NavBarTop /> */}
        <Navbar />
        <div className="bg-gray-50"> 
          {/* <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5D69842"
          height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript> */}
          {children}
        </div>
        <MobileFooter />
        <div className="w-full">
          <FooterTop />
          <div className="hidden relative lg:block mx-auto max-w-screen-2xl py-6 px-3 sm:px-10">
            <FeatureCard />
          </div>
          <hr className="hr-line"></hr>
          <div className="border-t border-gray-100 w-full">
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;

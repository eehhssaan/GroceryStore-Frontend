import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    return await Document.getInitialProps(ctx);
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.png" />
          <meta
            property="og:title"
            content="KachaBazar - React Grocery & Organic Food Store e-commerce Template"
          />
          <meta property="og:type" content="eCommerce Website" />
          <meta
            property="og:description"
            content="React Grocery & Organic Food Store e-commerce Template"
          />
          <meta
            property="og:url"
            content="https://kachabazar-store.vercel.app/"
          />
          <meta
            property="og:image"
            content="https://res.cloudinary.com/ahossain/image/upload/v1636729752/facebook-page_j7alju.png"
          />
          <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-5D69842');`,
          }}
        />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

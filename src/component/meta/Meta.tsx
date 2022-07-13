import NextHead from 'next/head';
import React, { FC, useEffect } from 'react';

const gtmCode = `${process.env.GTM_ID}`;

export interface MetaProps {
  title: string;
  description?: string;
  canonical?: string;
  keywords?: string;
}

export const Meta: FC<MetaProps> = ({ title, canonical, keywords, description }) => {
  return (
    <NextHead>
      <meta charSet="utf-8" />
      <meta content="yes" name="apple-mobile-web-app-capable" />
      <meta content="black" name="apple-mobile-web-app-status-bar-style" />
      <meta content="true" name="HandheldFriendly" />
      <meta content="" name="csrf-token" />
      <meta
        content="width=device-width,user-scalable=no,initial-scale=1.0,maximum-scale=1.0"
        name="viewport"
      />
      {/* eslint-disable-next-line global-require */}
      <link
        href={`${process.env.CDN_IMAGE_URL}/assets/favicon.svg`}
        rel="icon"
        type="image/x-icon"
      />
      <meta content="#ffffff" name="msapplication-TileColor" />
      <meta content="#ffffff" name="theme-color" />
      <title>{title ? `${title} | Preface` : 'Preface'}</title>
      {canonical && <link href={canonical} rel="canonical" />}
      {description && <meta content={description} name="description" />}
      {keywords && <meta content={keywords} name="keywords" />}

      <link href="https://fonts.gstatic.com" rel="preconnect" />
      <link href="https://fonts.googleapis.com" rel="preconect" />
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;700;900&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700;900&display=swap"
        rel="stylesheet"
      />
      <link
        as="style"
        href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;700;900&display=swap"
        rel="preload"
      />
      <link
        as="style"
        href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700;900&display=swap"
        rel="preload"
      />

      <style
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: `
          #no-fouc {
            opacity: 0;
            pointer-events: none;
          }
      `,
        }}
      />

      {/* insert heroku env variables */}
      <script id="env-vars" />

      {/* preface's assets */}
      <script
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer',window.gtmCode||'${gtmCode}');
    `,
        }}
      />
      <meta content="VwsuA-_Hx4a3nwfNfF5g-Iges_jqqIzi2Pzcpp68FOg" name="google-site-verification" />

      {/* TODO: legacy alert bar logic, remove it in phase 2 */}
      <script
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: `
        document.addEventListener('DOMContentLoaded', function() {
          var alertCloseButton = document.querySelector('button.close');

          if (!alertCloseButton) {
            return false;
          }

          alertCloseButton.addEventListener('click', function() {
            var alert = document.querySelector('.alert');

            if (alert) {
              alert.style = 'display: none;';
            }
          });
        }, false);
      `,
        }}
      />
    </NextHead>
  );
};

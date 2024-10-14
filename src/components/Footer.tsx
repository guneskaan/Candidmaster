import React from "react";
import Image from "next/image";
import {Container} from "@/components/Container";

// Placeholder SVG icons
const TwitterIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="h-6 w-6"
    fill="currentColor"
  >
    <path d="M12 0C5.383 0 0 5.383 0 12c0 5.305 3.438 9.814 8.207 11.438-.06-1.16.02-2.547.393-3.805l1.664-6.597H6.66s.12-2.47 0-3.291c-.375-1.667-1.387-2.758-3.097-3.27-.375-.11-.795-.16-1.23-.156-.426.003-.856.05-1.28.143C2.19 6.054 3.664 6.6 4.605 7.48c.614.602 1.054 1.41 1.262 2.293.237 1.02.203 1.75-.062 2.782-.203.937-.524 1.8-.935 2.582-.107.237-.268.546-.477.916-.235.423-.444.88-.444 1.36v1.328l4.445-.002.07-.027c.698-.282 1.27-.975 1.525-1.703l1.407-3.492 3.368 3.582c-.264.402-.495.845-.67 1.32-.294 1.004-.306 2.047-.067 3.098.277 1.354.866 2.577 1.735 3.6-2.65-.098-4.677-1.78-5.44-3.906.88.17 1.71-.1 2.46-.684.74-.582 1.292-1.414 1.58-2.344.31-1.066.294-2.235-.053-3.38-.44-1.78-1.45-3.28-2.83-4.383-.765-.687-1.605-1.18-2.51-1.472C8.256.903 7.58.657 6.89.5 6.55.426 6.197.373 5.85.347 3.498.162 1.32 1.63.36 3.015c-.23.686-.35 1.4-.348 2.12l-.004.046.005.034c.014.093.028.196.046.312L.06 5.934l-.06.086C2.277 8.286 5.092 9.78 8.128 9.79c-.16.174-.298.354-.404.54-1.052 1.898-.68 4.382.77 5.85 1.168 1.153 2.714 1.734 4.385 1.734 2.73 0 4.977-2.2 4.992-4.928l-.004-.174c.27-.2.52-.446.742-.74.38-.478.682-1.026.887-1.618.71-1.853 1.062-3.876 1.055-5.984v-.072C22 5.383 16.617 0 10 0z" />
  </svg>
);

const FacebookIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="h-6 w-6"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M18.5 1H5.5A4.502 4.502 0 0 0 1 5.5v13A4.502 4.502 0 0 0 5.5 23h6.4v-7.745h-2.607v-3.038h2.607V9.425c0-2.585 1.577-3.994 3.882-3.994 1.114 0 2.073.083 2.353.12v2.715h-1.607c-1.266 0-1.513.601-1.513 1.486v1.946h3.02l-.393 3.038h-2.627V23h5.145A4.502 4.502 0 0 0 23 18.5V5.5A4.502 4.502 0 0 0 18.5 1Z"
    />
  </svg>
);

const InstagramIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="h-6 w-6"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M12 1.5c3.523 0 3.956.014 5.35.078 1.39.063 2.727.336 3.946.758 1.222.425 2.311 1.04 3.24 1.96.93.92 1.535 2.017 1.96 3.24.42 1.22.695 2.56.758 3.95.063 1.394.078 1.827.078 5.35s-.014 3.956-.078 5.35c-.063 1.39-.336 2.727-.758 3.946-.425 1.222-1.04 2.311-1.96 3.24-.92.93-2.017 1.535-3.24 1.96-1.22.42-2.56.695-3.95.758-1.394.063-1.827.078-5.35.078s-3.956-.014-5.35-.078c-1.39-.063-2.727-.336-3.946-.758-1.222-.425-2.311-1.04-3.24-1.96-.93-.92-1.535-2.017-1.96-3.24-.42-1.22-.695-2.56-.758-3.95-.063-1.394-.078-1.827-.078-5.35s.014-3.956.078-5.35c.063-1.39.336-2.727.758-3.946.425-1.222 1.04-2.311 1.96-3.24.92-.93 2.017-1.535 3.24-1.96 1.22-.42 2.56-.695 3.95-.758 1.394-.063 1.827-.078 5.35-.078Zm0 3.25a8.25 8.25 0 1 0 0 16.5 8.25 8.25 0 0 0 0-16.5Zm0 4a4.25 4.25 0 1 0 0 8.5 4.25 4.25 0 0 0 0-8.5Zm6 1.25a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
    />
  </svg>
);

const LinkedinIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="h-6 w-6"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M2 4.5C2 3.121 3.121 2 4.5 2h15C20.879 2 22 3.121 22 4.5v15c0 1.379-1.121 2.5-2.5 2.5h-15C3.121 22 2 20.879 2 19.5v-15zM7 8H5v8h2V8zm-.25-2.5c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25c.69 0 1.25-.56 1.25-1.25s-.56-1.25-1.25-1.25zm10 11h-2V13c0-1.309-.871-1.882-1.818-1.882-.847 0-1.682.574-1.682 1.882v4h-2V8h2v1.191c.674-.858 1.744-1.191 2.682-1.191 1.495 0 2.818.818 2.818 3.818v4Z"
    />
  </svg>
);

const Footer: React.FC = () => {
  const navigation = [
    { label: "Product", url: "/" },
    { label: "Features", url: "/" },
    { label: "Blog", url: "/" },
  ];

  const legal = [
    { label: "Terms", url: "/" },
    { label: "Privacy", url: "/" },
    { label: "Legal", url: "/" },
  ];

  const socialLinks = [
    { label: "Twitter", url: "https://twitter.com/web3templates", icon: <TwitterIcon /> },
    { label: "Facebook", url: "https://facebook.com/web3templates", icon: <FacebookIcon /> },
    { label: "Instagram", url: "https://instagram.com/web3templates", icon: <InstagramIcon /> },
    { label: "Linkedin", url: "https://linkedin.com/", icon: <LinkedinIcon /> },
  ];

  return (
    <footer className="bg-white dark:bg-trueGray-900 border-t border-gray-200 dark:border-trueGray-700 w-full absolute bottom-0">
      <Container>
        <div className="max-w-screen-xl mx-auto py-10 lg:flex lg:justify-between">
          {/* Logo and Description */}
          <div className="flex mt-7 flex-col lg:flex-row items-center lg:items-start justify-center lg:justify-start lg:w-2/5 space-y-4 lg:space-y-0 lg:space-x-10">
          <Image
                  src="/img/logo.png"
                  width="150"
                  height="80"
                  alt="sus"
                  className="w-full"
                  style={{borderRadius: "10px"}}
                />
            <p className="text-sm text-gray-500 dark:text-gray-400 lg:max-w-md">
              Candidmaster is an innovative on-chain app developed by Coinbase to revolutionize event ticket sales by preventing scalping.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex mt-5 flex-col ml-20 lg:mt-0 lg:w-1/5 space-y-4 lg:space-y-0">
            <div className="text-gray-900 dark:text-gray-100">
              <h3 className="text-lg font-semibold">Navigation</h3>
              {navigation.map((item, index) => (
                <a
                  key={index}
                  href={item.url}
                  className="block mt-2 text-gray-500 dark:text-gray-300 hover:text-indigo-500 focus:text-indigo-500 focus:outline-none dark:focus:bg-trueGray-700"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Legal Links */}
          <div className="flex flex-col mt-5 lg:mt-0 lg:w-1/5 space-y-4 lg:space-y-0">
            <div className="text-gray-900 dark:text-gray-100">
              <h3 className="text-lg font-semibold">Legal</h3>
              {legal.map((item, index) => (
                <a
                  key={index}
                  href={item.url}
                  className="block mt-2 text-gray-500 dark:text-gray-300 hover:text-indigo-500 focus:text-indigo-500 focus:outline-none dark:focus:bg-trueGray-700"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center mt-5 lg:mt-0 lg:w-1/5 space-x-5">
            <span className="text-gray-400 dark:text-gray-500">Follow us</span>
            <div className="flex space-x-5">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  className="text-gray-400 dark:text-gray-500 hover:text-indigo-500 focus:text-indigo-500 focus:outline-none"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;

const devConfig = {
  dev: true,
  apiEndpoint: "http://covid.arifian.net.s3-website-ap-southeast-1.amazonaws.com/",
};

const prodConfig = {
  dev: false,
  apiEndpoint: "https://covid.arifian.net",
};

export const config = devConfig;
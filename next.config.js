module.exports = () => {
  const rewrites = () => {
    return [
      // {
      //   source: "/api/:path*",
      //   destination: "https://cron.numbers.lk/api/:path*",
      // },
    ];
  };
  return {
    rewrites,
  };
};

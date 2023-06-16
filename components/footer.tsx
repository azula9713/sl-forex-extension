function Footer() {
  return (
    <div className="text-right text-sm mt-4 flex items-center justify-end cursor-pointer">
      <div>Powered by </div>
      <div
        onClick={() =>
          window.open("https://tools.numbers.lk/exrates", "_blank")
        }
      >
        <img src="/numbers.png" className="w-10 ml-2" />
      </div>
    </div>
  );
}

export default Footer;

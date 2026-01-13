type FooterProps = {
  owner: string;
};

function Footer({ owner }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <small>
        © {currentYear} {owner}
      </small>
    </footer>
  );
}

export default Footer;
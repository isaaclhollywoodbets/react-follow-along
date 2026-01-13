function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <small>© {currentYear} My Name</small>
    </footer>
  );
}


export default Footer;
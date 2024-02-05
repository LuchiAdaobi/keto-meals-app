export default function Header() {
  function backToHome() {
    window.location.reload();
  }
  return (
    <header className="header" onClick={backToHome}>
      <h1>Nigerian Keto Cuisine</h1>
      <img
        src="https://lowcarbafrica.com/wp-content/uploads/2019/07/Okro-Soup-homepage.jpg"
        alt="okra soup"
      />
    </header>
  );
}

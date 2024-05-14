import { Link } from "react-router-dom";
function NavBar({ setHistory, history, createDeck }) {
  function pushId(data) {
    let idValues = [];
    for (let i = 0; i < data.length; i++) {
      idValues.push(data[i].id);
    }
    return idValues;
  }

  function handleClick() {
    fetch("http://localhost:3000/history")
      .then((r) => r.json())
      .then((data) => {
        const idValues = pushId(data);
        for (let i = 0; i < idValues.length; i++) {
          fetch(`http://localhost:3000/history/${idValues[i]}`, {
            method: "DELETE",
          });
        }
        setHistory(data);
      });
  }
  return (
    <div id="nav-bar">
      <Link to="/" className="nav-item">
        Home
      </Link>

      <Link to="/history" className="nav-item">
        History
      </Link>

      <Link to="/rules" className="nav-item">
        Rules
      </Link>

      <button id="start-over" onClick={handleClick}>
        Start Over
      </button>
    </div>
  );
}
export default NavBar;

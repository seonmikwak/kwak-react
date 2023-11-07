import { NavLink, useLocation } from "react-router-dom";

const Menu = props=>{
  const location = useLocation();
  // console.log(location.pathname);

  return(
    <>
      <nav className="navbar navbar-expand-lg bg-warning fixed-top" data-bs-theme="light">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">앱제목</NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarColor03">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <NavLink className={`nav-link ${location.pathname === '/pocketmon' ? 'active' : ''}`} to="/pocketmon">포켓몬스터</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={`nav-link ${location.pathname === '/book' ? 'active' : ''}`} to="/book">도서</NavLink>
              </li>
            </ul>
            <form className="d-flex">
              <input className="form-control me-sm-2" type="search" placeholder="Search"/>
              <button className="btn btn-info my-2 my-sm-0" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Menu;
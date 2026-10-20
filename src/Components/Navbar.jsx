import { NavLink } from "react-router-dom";

const Navbar=()=>{
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container">
        <NavLink className="navbar-brand" to="/articles">
          Gestion Articles
        </NavLink>

        <div className="d-flex gap-3">
          <NavLink className="nav-link text-white" to="/articles">
            Articles
          </NavLink>

          <NavLink className="nav-link text-white" to="/articles/add">
            Ajouter
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
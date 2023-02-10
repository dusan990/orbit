import { Link, NavLink } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";

import logo from "../assets/logo.svg";
import Icon from "./Icon";
import Avatar from "./Avatar";

export default function Header() {
	const { user } = useAuthContext();
   const { logout } = useLogout()

	return (
		<header className="main-header ">
         <img src={logo} className="app-logo" alt="logo" />

         <div className="textfield">
            {/* <label for="textfield1">Textfield label</label> */}
            <input type="search"
               id="textfield1"
               className="textfield_input"
               data-hotkey="s,/"
               placeholder="Search"
               autoCapitalize="sentences"
               role="combobox"
               aria-expanded="false"
               autoComplete="off"
            />
            <span className="shortcutKey">/</span>
         </div>

         <nav>
            <NavLink to="" className="btn btn_icon--ghost">
               <Icon name="import_contacts" />
            </NavLink>

            <NavLink to="questions" className="btn btn_icon--ghost">
               <Icon name="question_mark" />
            </NavLink>

            <NavLink to="bookmarks" className="btn btn_icon--ghost">
               <Icon name="bookmark" />
            </NavLink>

            <NavLink to="watching" className="btn btn_icon--ghost">
               <Icon name="visibility" />
            </NavLink>
         </nav>


         <nav className="user-nav">
            {user ?
               <>
                  <details className="userDetails">
                     <summary><Avatar /></summary>
                     <div className="userDetails__menu">
                        <p>Hello, {user.displayName}</p>
                        <NavLink to="profile" className="list__item">Profile</NavLink>
                        <NavLink to="login" className="list__item" onClick={logout}>Logout</NavLink>
                     </div>
                  </details>

                  <NavLink to="notifications" className="btn btn_icon--ghost">
                     <Icon name="notifications" />
                  </NavLink>

                  <div className="divider divider-12"></div>

                  <NavLink to="create" className="btn btn-primary">
                     <Icon name="add" />
                     Create
                  </NavLink>
               </>
               :
               <NavLink to="login" className="btn btn-primary">
                  Login
               </NavLink>
            }
         </nav>


         {/* <ThemeSetter /> */}
		</header>
	);
}

import { Link } from 'react-router-dom';
import javascript from "../assets/tags/javascript.svg";
import folder from "../assets/tags/folder.svg";

const Sidebar = () => {
	return (
      <div id="sidebar">
         <h2>Library</h2>
         <details>
            <summary>
               <img src={folder} />
               <span>Javascript</span>
               <img src={javascript} />
            </summary>
            <Link to="#">Hooks</Link>
            <Link to="#">Routes</Link>
         </details>

         <details>
            <summary>
               <img src={folder} />
               <span>Documents</span>
            </summary>
            <Link to="#">My bookmarks</Link>
            <Link to="#">
            How we can SSH connection using Jenkins file to particular device IP in local are network?
            </Link>

            <Link to="#">
            Get ping without opening external program/window c++
            </Link>

            <Link to="#">
            Use single quote in command line for the password
            </Link>
            <Link to="#">
            How we can SSH connection using Jenkins file to particular device IP in local are network?
            </Link>

            <Link to="#">
            Get ping without opening external program/window c++
            </Link>

            <Link to="#">
            Use single quote in command line for the password
            </Link>
            <Link to="#">
            How we can SSH connection using Jenkins file to particular device IP in local are network?
            </Link>

            <Link to="#">
            Get ping without opening external program/window c++
            </Link>

            <Link to="#">
            Use single quote in command line for the password
            </Link>
            <Link to="#">
            Use single quote in command line for the password
            </Link>
         </details>

         {/* {documents.map((doc, index) => (
            <div className="document" key={index}>
               <span className="documentId">{doc.id}</span>
               <Link
                  to={{ pathname: `/all/${doc.id}` }}
                  state={[ doc.title, doc.content ]}
               >{doc.title}</Link>
               <p>{doc.content}</p>
            </div>
         ))} */}
      </div>
   )
}

export default Sidebar;
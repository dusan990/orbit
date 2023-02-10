import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useLocation, useParams } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, onSnapshot, updateDoc, deleteDoc, arrayRemove } from "firebase/firestore";
import { database } from "../firebase/config"
import Icon from "../components/Icon";
import Button from "../components/Button";
import ButtonIcon from "../components/ButtonIcon";
import Avatar from "../components/Avatar";

export default function Document() {
   const { id } = useParams()
   const navigate = useNavigate()
   const location = useLocation();
   const props = location.state;
   
   const auth = getAuth();
   const user = auth.currentUser;
   const uid = user.uid;

   const [edit, setEdit] = useState(false);

   const handleEdit = (event) => {
		event.preventDefault();
		setEdit(!edit)
	}
   
   const handleDelete = async () => {
      await deleteDoc(doc(database, "docs", id));
      await updateDoc(doc(database, "users", uid), {
         createdDocs: arrayRemove(id)
      });

      navigate('/');
	}

   return (
      <div className="wrapper document">
         <nav className="document__nav">
            <Avatar />
            <div className="divider divider-12"></div>
            <input
               type="text"
               className="document__nav_title"
               defaultValue={props[0]}
               disabled={edit ? false : true}
            />
            {edit ?
               <ButtonIcon
                  type="button"
                  variant="btn-icon--ghost"
                  icon={ <Icon name="save"/> }
               />
               :
               <ButtonIcon
                  type="button"
                  variant="btn-icon--ghost"
                  icon={ <Icon name="edit"/> }
                  onClick={handleEdit}
               />
            }
            <ButtonIcon
               type="button"
               variant="btn-icon--ghost"
               // onClick={ handleDelete }
               icon={ <Icon name="delete"/> }
            />
         </nav>

         <div className="document__content">
            <textarea 
               type="text" 
               defaultValue={props[1]}
               disabled={edit ? false : true}
            />
         </div>

         {/* <input 
            type="text" 
            className="snippet_title_input"
            ref={titleRef}
            placeholder="Start with a title"
            defaultValue={document.title}
         />

         <MarkdownEditor 
            value={document.body}
            visible={true}
            onChange={(value) => setMarkdown(value)}
         />

         <Button 
            variant="primary" 
            onClick={handleUpdate}
         >
            Save
         </Button> */}
      </div>
   )
}
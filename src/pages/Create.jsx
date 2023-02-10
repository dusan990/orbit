import { useState } from "react";
import { doc, collection, addDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { database } from "../firebase/config";
import { useAuthContext } from "../hooks/useAuthContext";

export default function Create() {
   const { user } = useAuthContext()
   const [error, setError] = useState('')
   const [loading, setLoading] = useState(false)
   const [newDocument, setNewDocument] = useState({
      title: '',
      content: ''
   })
   
   const handleSubmit = async (e) => {
      e.preventDefault()
      setLoading(true)

      
      try {
         addDoc(collection(database, 'docs'), {
            uid: user.uid,
            title: newDocument.title,
            content: newDocument.content
         }).then(async function(docRef) {
            await updateDoc(doc(database, 'users', user.uid), {
               createdDocs: arrayUnion(docRef.id)
            });
         })
      } catch(err) {
         setError(err.message)
         setLoading(false)
      }

      setLoading(false)
      setNewDocument({title: '', content: ''})
   }
   
   return (
      <div className="documents">
         {error && <p>{error}</p>}
         
         <form onSubmit={handleSubmit}>
            <label className='snippet_title'>
               <input 
                  className="snippet_title_input"
                  type="text" 
                  onChange={(e) => 
                     setNewDocument( prevValues => {
                        return { ...prevValues, title: e.target.value}
                     })
                  }
                  value={newDocument.title}
                  placeholder="Start with a title"
                  required
               />
            </label>
            
            <label className='snippet_title'>
               <input 
                  className="snippet_title_input"
                  type="text" 
                  onChange={(e) => 
                     setNewDocument( prevValues => {
                        return { ...prevValues, content: e.target.value}
                     })
                  }
                  value={newDocument.content}
                  placeholder="Content here"
                  required
               />
            </label>

            <button onClick={handleSubmit}>
               {loading ? 'Uploading...' : 'Publish'}
            </button>
         </form>
      </div>
   )
}
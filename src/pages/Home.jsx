import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { database } from "../firebase/config"
import { collection, doc, getDoc, query, where, startAfter, limit, getDocs } from "firebase/firestore";
import { getCurrentUser } from "../utils.js/getCurrentUser";

export default function Home() {
   const [documents, setDocuments] = useState([]);
	const [lastVisible, setLastVisible] = useState(null);
   const [loadButton, setLoadButton] = useState(true)
   const [loadMoreSection, setloadMoreSection] = useState(true)
   const userId = getCurrentUser(); 
   
	useEffect(() => {
		const getData = async () => {
			const first = query(collection(database, "docs"), where('uid', '==', userId.uid), limit(10));
			const documentSnapshots = await getDocs(first);
         setDocuments(documentSnapshots.docs.map((doc) => ({...doc.data(), id: doc.id}) ));
			setLastVisible(documentSnapshots.docs[documentSnapshots.docs.length - 1]);
         
         if(documentSnapshots.docs.length < 10) {
            setloadMoreSection(false)
         }
		};

		getData();
	}, []);

	const loadMore = async () => {
		const next = query(
			collection(database, "docs"),
			startAfter(lastVisible),
			limit(10)
		);

		// const documentSnapshots = await getDocs(next);
		// setDocuments(
		// 	documents.concat(documentSnapshots.docs.map((doc) => ({...doc.data(), id: doc.id}) ))
		// );
		// setLastVisible(documentSnapshots.docs[documentSnapshots.docs.length - 1]);
      const documentSnapshots = await getDocs(next);
      if (documentSnapshots.empty) {
         setLoadButton(false)
         console.log("nothing to load")
      } else {
         setLoadButton(true)
         setDocuments(
            documents.concat(documentSnapshots.docs.map((doc) => ({...doc.data(), id: doc.id}) ))
         );
         setLastVisible(documentSnapshots.docs[documentSnapshots.docs.length - 1]);
         if(documentSnapshots.docs.length < 10) {
            setLoadButton(false)
         }
      }
	};


	return (
      <div className="container" id="library">
         {documents && 
            <>
               {documents.map((doc, index) => (
                  <div className="document" key={index}>
                     <span className="documentId">{doc.id}</span>
                     <Link
                        to={{ pathname: `/all/${doc.id}` }}
                        state={[ doc.title, doc.content ]}
                     >{doc.title}</Link>
                     <p>{doc.content}</p>
                  </div>
               ))}
               
               {loadMoreSection &&
                  <div className="loaderButton">
                     {loadButton ? 
                        <button onClick={loadMore} className="btn btn-ghost">Load More</button>
                        :
                        <p>No more results</p>
                     }
                  </div>
               }
            </>
         }
         {!documents && 
            <p>your first doc</p>
         }
      </div>
	);
}

// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { database } from "../firebase/config"
// import { collection, doc, getDoc, query, orderBy, startAfter, limit, getDocs } from "firebase/firestore";

// export default function Home() {
//    const [users, setUsers] = useState(null);
//    const [documents, setDocuments] = useState([]);
// 	const [lastVisible, setLastVisible] = useState(null);

// 	useEffect(() => {
// 		const getData = async () => {
// 			const first = query(collection(database, "docs"), limit(2));
// 			const documentSnapshots = await getDocs(first);
// 			setDocuments(documentSnapshots.docs.map((doc) => doc.data()));
// 			setLastVisible(documentSnapshots.docs[documentSnapshots.docs.length - 1]);
// 		};

// 		getData();
// 	}, []);

// 	const loadMore = async () => {
// 		const next = query(
// 			collection(database, "docs"),
// 			startAfter(lastVisible),
// 			limit(2)
// 		);
// 		const documentSnapshots = await getDocs(next);
// 		setDocuments(
// 			documents.concat(documentSnapshots.docs.map((doc) => doc.data()))
// 		);
// 		setLastVisible(documentSnapshots.docs[documentSnapshots.docs.length - 1]);
// 	};

// 	return (
//       <main className="main" id="library">
//          <div className="container">
//             {documents.map((doc, index) => (
//                <div className="document" key={index}>
//                   <Link
//                      to={{ pathname: `/all/${doc.id}` }}
//                      state={[ doc.title, doc.content ]}
//                   >{doc.title}</Link>
//                   <p>{doc.content}</p>
//                </div>
//             ))}
//             <button onClick={loadMore}>Load More</button>
//          </div>
//       </main>
// 	);
// }
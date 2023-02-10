import React, { useState, useEffect } from "react";
import { database } from "../firebase/config";
import {
	onSnapshot,
	collection,
	doc,
	getDoc,
	query,
	orderBy,
	startAfter,
	limit,
	getDocs,
} from "firebase/firestore";

export default function TryPaginate() {
	const [documents, setDocuments] = useState([]);
	const [lastVisible, setLastVisible] = useState(null);

	useEffect(() => {
		const getData = async () => {
			const first = query(collection(database, "docs"), limit(2));
			const documentSnapshots = await getDocs(first);
			setDocuments(documentSnapshots.docs.map((doc) => doc.data()));
			setLastVisible(documentSnapshots.docs[documentSnapshots.docs.length - 1]);
		};

		getData();
	}, []);

	const loadMore = async () => {
		const next = query(
			collection(database, "docs"),
			startAfter(lastVisible),
			limit(2)
		);
		const documentSnapshots = await getDocs(next);
		setDocuments(
			documents.concat(documentSnapshots.docs.map((doc) => doc.data()))
		);
		setLastVisible(documentSnapshots.docs[documentSnapshots.docs.length - 1]);
	};

	return (
		<div>
			{documents.map((doc, index) => (
				<div key={index}>
					<p>title: {doc.title}</p>
					<p>content: {doc.content}</p>
				</div>
			))}
			<button onClick={loadMore}>Load More</button>
		</div>
	);
}

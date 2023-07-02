import { Link, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import styles from "../styles/noteDetails.css";
import { getStoredNotes } from "../data/notes";

export default function NoteDetailsPage() {
  const noteDetails = useLoaderData();

  return (
    <main id="note-details">
      <header>
        <nav>
          <Link to="/">Back to notes</Link>
        </nav>
        <h1>{noteDetails.title}</h1>
      </header>
      <p id="note-details-content">{noteDetails.content}</p>
    </main>
  );
}

export async function loader({ params }) {
  const notes = await getStoredNotes();
  const noteId = params.noteId;
  const noteDetails = notes.find((item) => item.id === noteId);
  if (!noteDetails) {
    throw json(
      { message: "Could not find the note with id " + noteId },
      { statusCode: 404 }
    );
  }
  return noteDetails;
}

export function meta({ data }) {
  return [{ title: data.title }, { name: data.content, content: "..." }];
}

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

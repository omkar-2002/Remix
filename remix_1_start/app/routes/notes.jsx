import React from "react";
noteListLinks;
import { json, redirect } from "@remix-run/node";
import { Link } from "@remix-run/react";
import NewNote, {
  links as newNotesLinks,
} from "../components/newNotes/NewNote";
import NoteList, {
  links as noteListLinks,
} from "../components/noteLists/NoteList";
import { getStoredNotes, storeNotes } from "../data/notes";
import { useCatch, useLoaderData, useRouteError } from "@remix-run/react";

export default function NotesPage() {
  const notes = useLoaderData();

  return (
    <main>
      <NewNote />
      <NoteList notes={notes} />
    </main>
  );
}

export async function loader() {
  const notes = await getStoredNotes();
  if (!notes || notes.length == 0) {
    throw json(
      { message: "Could not find any notes.!" },
      {
        status: 404,
        statusText: "Not Found",
      }
    );
  }
  return notes;
}

export const meta = () => {
  return [
    { title: "All notes" },
    {
      property: "hey",
      content: "here you will find all notes",
    },
    {
      name: "here you will find all notes",
      content: "here you will find all notes",
    },
  ];
};

export async function action({ request }) {
  // getting the formData from the post request
  let formData = await request.formData();
  let newNote = Object.fromEntries(formData);
  newNote.id = new Date().toISOString();

  if (newNote.title.trim().length < 5) {
    return { message: "Title should be greater than 5 letters!" };
  }

  // Getting previos notes and adding new one to the data
  const previousNotes = await getStoredNotes();
  const newNotes = previousNotes.concat(newNote);

  // storing the new note list inside the json data
  await storeNotes(newNotes);
  return redirect("/notes");
}

export function ErrorBoundary() {
  //REMIX has changed the built in error prop to a hook
  const routeError = useRouteError();
  const message = routeError?.data?.message
    ? routeError.data.message
    : routeError.message
    ? routeError.message
    : "Oops! Something went wrong.";

  return (
    <main>
      <NewNote />
      <p className="info-message">{message}</p>
    </main>
  );
}

export function links() {
  return [...newNotesLinks(), ...noteListLinks()];
}

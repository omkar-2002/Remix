import React from "react";
import { Form, useActionData, useNavigation } from "@remix-run/react";
import newNotesStyle from "./NewNote.css";

export default function NewNotes() {
  const navigation = useNavigation();
  const data = useActionData();

  const submitting = navigation.state == "submitting";
  return (
    <Form method="post" id="note-form">
      {data?.message && <p>{data?.message}</p>}
      <p>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" required />
      </p>
      <p>
        <label htmlFor="content">Content</label>
        <textarea id="content" name="content" rows="5" required />
      </p>
      <div className="form-actions">
        <button disabled={submitting}>
          {submitting ? "Adding..." : "Add note"}
        </button>
      </div>
    </Form>
  );
}

export function links() {
  return [{ rel: "stylesheet", href: newNotesStyle }];
}

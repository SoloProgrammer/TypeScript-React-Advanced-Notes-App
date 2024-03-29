import {
  Navigate,
  Outlet,
  useOutletContext,
  useParams,
} from "react-router-dom";
import { Note } from "../types/Notestypes";

type NoteLayoutProps = {
  notes: Note[];
};

const NoteLayout = ({ notes }: NoteLayoutProps) => {
  const { id } = useParams();
  const note = notes.find((note) => note.id === id);

  return !note ? <Navigate to={"/"} replace /> : <Outlet context={note} />;
};

export default NoteLayout;

export function useNote() {
  return useOutletContext<Note>();
}

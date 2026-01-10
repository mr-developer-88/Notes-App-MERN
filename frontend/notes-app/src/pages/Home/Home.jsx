import React, { useEffect, useState, useCallback, useMemo } from "react";
import Navbar from "../../components/Navbar/Navbar";
import NoteCard from "../../components/cards/NoteCard";
import NoteSkeleton from "../../components/cards/NoteSkeleton";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "./AddEditNotes";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import Toast from "../../components/ToastMessage/Toast";
import EmptyCard from "../../components/EmptyCard/EmptyCard";
import AddNoteImg from "../../assets/images/add-note-svgrepo-com.svg";
import NoDataImg from "../../assets/images/no-data-svgrepo-com.svg";
import NoteReader from "../../components/NoteReader/NoteReader";

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShow: false,
    type: "add",
    data: null,
  });

  const [showToastMsg, setShowToastMsg] = useState({
    isShown: false,
    message: "",
    type: "add",
  });

  const [allNotes, setAllNotes] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [isSearch, setIsSearch] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [activeNote, setActiveNote] = useState(null);
  const [pinningNoteId, setPinningNoteId] = useState(null);
  const [deletingNoteId, setDeletingNoteId] = useState(null);

  const navigate = useNavigate();

  // Derived sorted notes: pinned first, then others, each group ordered by most recent createOn
  const sortedNotes = useMemo(() => {
    if (!Array.isArray(allNotes) || allNotes.length === 0) return [];

    const getTimestamp = (note) => {
      if (!note?.createOn) return 0;
      const d = new Date(note.createOn);
      const t = d.getTime();
      return Number.isNaN(t) ? 0 : t;
    };

    const compareByDateDesc = (a, b) => {
      const ta = getTimestamp(a);
      const tb = getTimestamp(b);
      if (tb !== ta) return tb - ta; // newer first
      const idA = String(a?._id ?? "");
      const idB = String(b?._id ?? "");
      return idA.localeCompare(idB);
    };

    const pinned = [];
    const others = [];

    for (const note of allNotes) {
      if (note?.isPinned) {
        pinned.push(note);
      } else {
        others.push(note);
      }
    }

    pinned.sort(compareByDateDesc);
    others.sort(compareByDateDesc);

    return [...pinned, ...others];
  }, [allNotes]);

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({ isShow: true, data: noteDetails, type: "edit" });
  };

  const showToastMessage = (message, type = "add") => {
    setShowToastMsg({
      isShown: true,
      message,
      type,
    });
  };

  const handleCloseToast = () => {
    setShowToastMsg({
      isShown: false,
      message: "",
      type: "add",
    });
  };

  // Get User Info
  const getUserInfo = useCallback(async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  }, [navigate]);

  // Get All Notes (initial / refresh)
  const getAllNotes = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get("/get-all-notes");

      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      showToastMessage(
        error.displayMessage || "Failed to fetch notes",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Optimistic helpers
  const handleNoteAdded = useCallback((note) => {
    setAllNotes((prev) => [note, ...prev]);
    setIsSearch(false);
  }, []);

  const handleNoteUpdated = useCallback((updatedNote) => {
    setAllNotes((prev) =>
      prev.map((note) => (note._id === updatedNote._id ? updatedNote : note))
    );
  }, []);

  const handleNoteDeletedLocally = useCallback((noteId) => {
    setAllNotes((prev) => prev.filter((note) => note._id !== noteId));
  }, []);

  // Delete Note (optimistic)
  const deleteNote = async (data) => {
    const noteId = data._id;
    setDeletingNoteId(noteId);
    const previousNotes = allNotes;
    handleNoteDeletedLocally(noteId);

    try {
      const response = await axiosInstance.delete("/delete-note/" + noteId);

      if (response.data && !response.data.error) {
        showToastMessage("Note Deleted Successfully", "delete");
      } else {
        // rollback if API indicates error
        setAllNotes(previousNotes);
      }
    } catch (error) {
      setAllNotes(previousNotes);
      showToastMessage(
        error.displayMessage || "Failed to delete note",
        "error"
      );
    } finally {
      setDeletingNoteId(null);
    }
  };

  // Search for A Note (button-level loading)
  const onSearchNote = async (query) => {
    if (!query?.trim()) return;
    try {
      setIsSearching(true);
      const response = await axiosInstance("/search-notes", {
        params: { query },
      });

      if (response.data && response.data.notes) {
        setIsSearch(true);
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      showToastMessage(error.displayMessage || "Search failed", "error");
    } finally {
      setIsSearching(false);
    }
  };

  // Updated is Pinned (optimistic)
  const updateIsPinned = async (noteData) => {
    const noteId = noteData._id;
    setPinningNoteId(noteId);

    const previousNotes = allNotes;
    // optimistic local toggle
    setAllNotes((prev) =>
      prev.map((note) =>
        note._id === noteId ? { ...note, isPinned: !note.isPinned } : note
      )
    );

    try {
      const response = await axiosInstance.put(
        "/update-note-pinned/" + noteId,
        {
          isPinned: !noteData.isPinned,
        }
      );

      if (response.data && response.data.note) {
        showToastMessage("Note Updated Successfully");
        // ensure local state has any updated fields from backend
        setAllNotes((prev) =>
          prev.map((note) =>
            note._id === noteId ? response.data.note : note
          )
        );
      } else {
        setAllNotes(previousNotes);
      }
    } catch (error) {
      setAllNotes(previousNotes);
      showToastMessage(
        error.displayMessage || "Failed to update note",
        "error"
      );
    } finally {
      setPinningNoteId(null);
    }
  };

  // Mark note as seen when opened (optimistic)
  const handleOpenNote = async (note) => {
    if (!note) return;

    if (!note.seen) {
      const noteId = note._id;
      // Optimistically mark as seen in the list
      setAllNotes((prev) =>
        prev.map((n) => (n._id === noteId ? { ...n, seen: true } : n))
      );
      // Also ensure activeNote reflects the seen state
      setActiveNote({ ...note, seen: true });

      try {
        await axiosInstance.put("/update-note-seen/" + noteId, { seen: true });
      } catch (error) {
        // Non-critical failure: keep UI as seen to avoid flicker
      }
    } else {
      setActiveNote(note);
    }
  };

  const handleClearSearch = () => {
    setIsSearch(false);
    setIsSearching(false);
    getAllNotes();
  };

  useEffect(() => {
    getAllNotes();
    getUserInfo();
  }, [getAllNotes, getUserInfo]);

  return (
    <>
      <Navbar
        userInfo={userInfo}
        onSearchNote={onSearchNote}
        handleClearSearch={handleClearSearch}
        isSearching={isSearching}
      />

      <main className="min-h-[calc(100vh-4rem)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 animate-fadeIn">
              {Array.from({ length: 8 }).map((_, index) => (
                <NoteSkeleton key={index} />
              ))}
            </div>
          ) : sortedNotes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 animate-fadeIn">
              {sortedNotes.map((item) => (
                <NoteCard
                  key={item._id}
                  id={item._id}
                  title={item.title}
                  date={item.createOn}
                  content={item.content}
                  tags={item.tags}
                  isPinned={item.isPinned}
                  seen={item.seen}
                  isPinning={pinningNoteId === item._id}
                  isDeleting={deletingNoteId === item._id}
                  onEdit={() => handleEdit(item)}
                  onDelete={() => deleteNote(item)}
                  onPinNote={() => updateIsPinned(item)}
                  onOpen={() => handleOpenNote(item)}
                />
              ))}
            </div>
          ) : (
            <EmptyCard
              imgSrc={isSearch ? NoDataImg : AddNoteImg}
              message={
                isSearch
                  ? `Oops! No data found matching your search.`
                  : `Start creating your first note! Click the 'Add' button to jot down your thoughts, ideas, and reminders. Let's get started!`
              }
            />
          )}
        </div>
      </main>

      <button
        className="group w-14 h-14 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 fixed right-6 bottom-6 shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95 z-50 focus:outline-none focus:ring-4 focus:ring-primary/50"
        onClick={() => {
          setOpenAddEditModal({ isShow: true, type: "add", data: null });
        }}
        aria-label="Add new note"
      >
        <MdAdd className="text-3xl text-white group-hover:rotate-90 transition-transform duration-300" />
      </button>

      <Modal
        isOpen={openAddEditModal.isShow}
        onRequestClose={() => {
          setOpenAddEditModal({ isShow: false, type: "add", data: null });
        }}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(4px)",
            zIndex: 9999,
          },
        }}
        contentLabel="Add/Edit Note"
        className="w-[95%] sm:w-[90%] md:w-[600px] lg:w-[700px] max-h-[90vh] bg-white dark:bg-gray-900 rounded-2xl mx-auto mt-8 md:mt-14 p-6 overflow-auto shadow-2xl focus:outline-none"
        ariaHideApp={false}
      >
        <AddEditNotes
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onclose={() => {
            setOpenAddEditModal({ isShow: false, type: "add", data: null });
          }}
          showToastMessage={showToastMessage}
          onNoteAdded={handleNoteAdded}
          onNoteUpdated={handleNoteUpdated}
        />
      </Modal>

      <Toast
        isShown={showToastMsg.isShown}
        message={showToastMsg.message}
        type={showToastMsg.type}
        onClose={handleCloseToast}
      />

      <NoteReader note={activeNote} onClose={() => setActiveNote(null)} />
    </>
  );
};

export default Home;

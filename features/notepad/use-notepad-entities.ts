import {
  Dispatch,
  SetStateAction,
  useDeferredValue,
  useMemo,
  useState,
} from "react";

import { AppStore, LinkItem, NoteItem, ShoppingItem, TodoItem } from "./types";
import { createId, nowIso, reorderWithUpdate, toOpenableUrl } from "./utils";

export function useNotepadEntities(
  store: AppStore,
  setStore: Dispatch<SetStateAction<AppStore>>,
) {
  const [noteTitle, setNoteTitle] = useState("");
  const [noteBody, setNoteBody] = useState("");
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [noteSearch, setNoteSearch] = useState("");

  const [todoTitle, setTodoTitle] = useState("");
  const [editingTodoId, setEditingTodoId] = useState<string | null>(null);
  const [todoSearch, setTodoSearch] = useState("");

  const [shoppingLabel, setShoppingLabel] = useState("");
  const [shoppingQuantity, setShoppingQuantity] = useState("");
  const [editingShoppingId, setEditingShoppingId] = useState<string | null>(
    null,
  );
  const [shoppingSearch, setShoppingSearch] = useState("");

  const [linkUrlInput, setLinkUrlInput] = useState("");
  const [linkDescriptionInput, setLinkDescriptionInput] = useState("");
  const [linkSearch, setLinkSearch] = useState("");
  const [linkEditingId, setLinkEditingId] = useState<string | null>(null);

  const deferredNoteSearch = useDeferredValue(noteSearch.trim().toLowerCase());
  const deferredTodoSearch = useDeferredValue(todoSearch.trim().toLowerCase());
  const deferredShoppingSearch = useDeferredValue(
    shoppingSearch.trim().toLowerCase(),
  );
  const deferredLinkSearch = useDeferredValue(linkSearch.trim().toLowerCase());

  const notes = useMemo(
    () =>
      store.notes
        .filter((item) => {
          if (!deferredNoteSearch) {
            return true;
          }
          const title = item.title.toLowerCase();
          const body = item.body.toLowerCase();
          return (
            title.includes(deferredNoteSearch) ||
            body.includes(deferredNoteSearch)
          );
        })
        .sort((left, right) => right.updatedAt.localeCompare(left.updatedAt)),
    [deferredNoteSearch, store.notes],
  );

  const todos = useMemo(
    () =>
      store.todos
        .filter((item) => {
          if (!deferredTodoSearch) {
            return true;
          }
          return item.title.toLowerCase().includes(deferredTodoSearch);
        })
        .sort((left, right) => {
          if (left.done !== right.done) {
            return Number(left.done) - Number(right.done);
          }
          return right.updatedAt.localeCompare(left.updatedAt);
        }),
    [deferredTodoSearch, store.todos],
  );

  const shoppingItems = useMemo(
    () =>
      store.shopping
        .filter((item) => {
          if (!deferredShoppingSearch) {
            return true;
          }
          return item.label.toLowerCase().includes(deferredShoppingSearch);
        })
        .sort((left, right) => right.updatedAt.localeCompare(left.updatedAt)),
    [deferredShoppingSearch, store.shopping],
  );

  const links = useMemo(
    () =>
      store.links
        .filter((item) => {
          if (!deferredLinkSearch) {
            return true;
          }
          return (
            item.url.toLowerCase().includes(deferredLinkSearch) ||
            item.description.toLowerCase().includes(deferredLinkSearch)
          );
        })
        .sort((left, right) => right.updatedAt.localeCompare(left.updatedAt)),
    [deferredLinkSearch, store.links],
  );

  const handleNoteSubmit = () => {
    const title = noteTitle.trim();
    const body = noteBody.trim();
    if (!title && !body) {
      return false;
    }

    if (editingNoteId) {
      setStore((currentStore) => {
        const existing = currentStore.notes.find(
          (item) => item.id === editingNoteId,
        );
        if (!existing) {
          return currentStore;
        }
        const updatedItem: NoteItem = {
          ...existing,
          title: title || "Untitled note",
          body,
          updatedAt: nowIso(),
        };
        return {
          ...currentStore,
          notes: reorderWithUpdate(currentStore.notes, updatedItem),
        };
      });
      setEditingNoteId(null);
    } else {
      const timestamp = nowIso();
      const nextNote: NoteItem = {
        id: createId(),
        title: title || "Untitled note",
        body,
        createdAt: timestamp,
        updatedAt: timestamp,
      };
      setStore((currentStore) => ({
        ...currentStore,
        notes: [nextNote, ...currentStore.notes],
      }));
    }

    setNoteTitle("");
    setNoteBody("");
    return true;
  };

  const editNote = (item: NoteItem) => {
    setNoteTitle(item.title);
    setNoteBody(item.body);
    setEditingNoteId(item.id);
  };

  const cancelNoteEdit = () => {
    setEditingNoteId(null);
    setNoteTitle("");
    setNoteBody("");
  };

  const deleteNote = (id: string) => {
    setStore((currentStore) => ({
      ...currentStore,
      notes: currentStore.notes.filter((item) => item.id !== id),
    }));
    if (editingNoteId === id) {
      cancelNoteEdit();
    }
  };

  const handleTodoSubmit = () => {
    const title = todoTitle.trim();
    if (!title) {
      return false;
    }

    if (editingTodoId) {
      setStore((currentStore) => {
        const existing = currentStore.todos.find(
          (item) => item.id === editingTodoId,
        );
        if (!existing) {
          return currentStore;
        }
        const updatedItem: TodoItem = {
          ...existing,
          title,
          updatedAt: nowIso(),
        };
        return {
          ...currentStore,
          todos: reorderWithUpdate(currentStore.todos, updatedItem),
        };
      });
      setEditingTodoId(null);
    } else {
      const timestamp = nowIso();
      const nextTodo: TodoItem = {
        id: createId(),
        title,
        done: false,
        createdAt: timestamp,
        updatedAt: timestamp,
      };
      setStore((currentStore) => ({
        ...currentStore,
        todos: [nextTodo, ...currentStore.todos],
      }));
    }

    setTodoTitle("");
    return true;
  };

  const editTodo = (item: TodoItem) => {
    setTodoTitle(item.title);
    setEditingTodoId(item.id);
  };

  const cancelTodoEdit = () => {
    setEditingTodoId(null);
    setTodoTitle("");
  };

  const deleteTodo = (id: string) => {
    setStore((currentStore) => ({
      ...currentStore,
      todos: currentStore.todos.filter((item) => item.id !== id),
    }));
    if (editingTodoId === id) {
      cancelTodoEdit();
    }
  };

  const toggleTodo = (id: string) => {
    setStore((currentStore) => {
      const target = currentStore.todos.find((item) => item.id === id);
      if (!target) {
        return currentStore;
      }
      const updated: TodoItem = {
        ...target,
        done: !target.done,
        updatedAt: nowIso(),
      };
      return {
        ...currentStore,
        todos: reorderWithUpdate(currentStore.todos, updated),
      };
    });
  };

  const handleLinkSubmit = () => {
    const url = toOpenableUrl(linkUrlInput);
    const description = linkDescriptionInput.trim();
    if (!url) {
      return false;
    }

    if (linkEditingId) {
      setStore((currentStore) => {
        const existing = currentStore.links.find(
          (item) => item.id === linkEditingId,
        );
        if (!existing) {
          return currentStore;
        }
        const updatedItem: LinkItem = {
          ...existing,
          url,
          description,
          updatedAt: nowIso(),
        };
        return {
          ...currentStore,
          links: reorderWithUpdate(currentStore.links, updatedItem),
        };
      });
      setLinkEditingId(null);
    } else {
      const timestamp = nowIso();
      const nextLink: LinkItem = {
        id: createId(),
        url,
        description,
        createdAt: timestamp,
        updatedAt: timestamp,
      };
      setStore((currentStore) => ({
        ...currentStore,
        links: [nextLink, ...currentStore.links],
      }));
    }

    setLinkUrlInput("");
    setLinkDescriptionInput("");
    return true;
  };

  const editLink = (item: LinkItem) => {
    setLinkUrlInput(item.url);
    setLinkDescriptionInput(item.description);
    setLinkEditingId(item.id);
  };

  const cancelLinkEdit = () => {
    setLinkEditingId(null);
    setLinkUrlInput("");
    setLinkDescriptionInput("");
  };

  const deleteLink = (id: string) => {
    setStore((currentStore) => ({
      ...currentStore,
      links: currentStore.links.filter((item) => item.id !== id),
    }));
    if (linkEditingId === id) {
      cancelLinkEdit();
    }
  };

  const handleShoppingSubmit = () => {
    const label = shoppingLabel.trim();
    const quantity = shoppingQuantity.trim();
    if (!label) {
      return false;
    }

    if (editingShoppingId) {
      setStore((currentStore) => {
        const existing = currentStore.shopping.find(
          (item) => item.id === editingShoppingId,
        );
        if (!existing) {
          return currentStore;
        }
        const updatedItem: ShoppingItem = {
          ...existing,
          label,
          quantity: quantity || undefined,
          updatedAt: nowIso(),
        };
        return {
          ...currentStore,
          shopping: reorderWithUpdate(currentStore.shopping, updatedItem),
        };
      });
      setEditingShoppingId(null);
    } else {
      const timestamp = nowIso();
      const nextItem: ShoppingItem = {
        id: createId(),
        label,
        quantity: quantity || undefined,
        createdAt: timestamp,
        updatedAt: timestamp,
      };
      setStore((currentStore) => ({
        ...currentStore,
        shopping: [nextItem, ...currentStore.shopping],
      }));
    }

    setShoppingLabel("");
    setShoppingQuantity("");
    return true;
  };

  const editShopping = (item: ShoppingItem) => {
    setShoppingLabel(item.label);
    setShoppingQuantity(item.quantity ?? "");
    setEditingShoppingId(item.id);
  };

  const cancelShoppingEdit = () => {
    setEditingShoppingId(null);
    setShoppingLabel("");
    setShoppingQuantity("");
  };

  const deleteShopping = (id: string) => {
    setStore((currentStore) => ({
      ...currentStore,
      shopping: currentStore.shopping.filter((item) => item.id !== id),
    }));
    if (editingShoppingId === id) {
      cancelShoppingEdit();
    }
  };

  return {
    noteTitle,
    noteBody,
    editingNoteId,
    noteSearch,
    todoTitle,
    editingTodoId,
    todoSearch,
    shoppingLabel,
    shoppingQuantity,
    editingShoppingId,
    shoppingSearch,
    linkUrlInput,
    linkDescriptionInput,
    linkEditingId,
    linkSearch,
    deferredNoteSearch,
    deferredTodoSearch,
    deferredShoppingSearch,
    deferredLinkSearch,
    notes,
    todos,
    links,
    shoppingItems,
    setNoteTitle,
    setNoteBody,
    setNoteSearch,
    setTodoTitle,
    setTodoSearch,
    setShoppingLabel,
    setShoppingQuantity,
    setShoppingSearch,
    setLinkUrlInput,
    setLinkDescriptionInput,
    setLinkSearch,
    handleNoteSubmit,
    editNote,
    cancelNoteEdit,
    deleteNote,
    handleTodoSubmit,
    editTodo,
    cancelTodoEdit,
    deleteTodo,
    toggleTodo,
    handleShoppingSubmit,
    editShopping,
    cancelShoppingEdit,
    deleteShopping,
    handleLinkSubmit,
    editLink,
    cancelLinkEdit,
    deleteLink,
  };
}

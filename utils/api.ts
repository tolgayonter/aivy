const createURL = (path) => {
  return window.location.origin + path;
};

export const createNewEntry = async () => {
  const response = await fetch(
    new Request(createURL("/api/entry"), {
      method: "POST",
    })
  );

  if (response.ok) {
    const result = await response.json();
    return result.data;
  }
};

export const updateEntry = async (id, content) => {
  const response = await fetch(
    new Request(createURL(`/api/entry/${id}`), {
      method: "PATCH",
      body: JSON.stringify({ content }),
    })
  );

  if (response.ok) {
    const result = await response.json();
    return result.data;
  }
};

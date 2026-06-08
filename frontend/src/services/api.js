const API_URL = "http://localhost:3000";

export async function getPosts() {
  const response = await fetch(
    `${API_URL}/images`
  );

  return response.json();
}

export async function likePost(id) {
  await fetch(
    `${API_URL}/like/${id}`,
    {
      method: "POST",
    }
  );
}

export async function deletePost(id) {
  await fetch(
    `${API_URL}/posts/${id}`,
    {
      method: "DELETE",
    }
  );
}

export async function editPost(
  id,
  caption
) {
  await fetch(
    `${API_URL}/posts/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        caption,
      }),
    }
  );
}

export async function uploadPost(
  formData
) {
  const response = await fetch(
    `${API_URL}/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  return response.json();
}
const uploadForm = document.getElementById("uploadForm");
const imageInput = document.getElementById("imageInput");
const feed = document.getElementById("feed");
const captionInput = document.getElementById("captionInput");

// Load existing images
async function loadImages() {
  try {
    const response = await fetch("/images");
    const images = await response.json();

    feed.innerHTML = "";

    images.reverse().forEach((post) => {
        const postDiv = document.createElement("div");

        const img = document.createElement("img");
        img.src = post.imageUrl;
        img.width = 300;

        const caption = document.createElement("p");
        caption.innerText = post.caption;

        const timestamp = document.createElement("small");
        timestamp.innerText = new Date(post.createdAt).toLocaleString();

        postDiv.appendChild(img);
        postDiv.appendChild(caption);
        postDiv.appendChild(timestamp);

        feed.appendChild(postDiv);
    });

  } catch (error) {
    console.error(error);
  }
}

// Upload image
uploadForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const file = imageInput.files[0];

  if (!file) {
    alert("Please select image");
    return;
  }

  const formData = new FormData();
  formData.append("image", file);
  formData.append("caption", captionInput.value);

  try {
    await fetch("/upload", {
      method: "POST",
      body: formData,
    });

    loadImages();

    uploadForm.reset();
  } catch (error) {
    console.error(error);
  }
});

// Initial load
loadImages();
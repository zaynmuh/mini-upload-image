const uploadForm = document.getElementById("uploadForm");
const imageInput = document.getElementById("imageInput");
const feed = document.getElementById("feed");

// Load existing images
async function loadImages() {
  try {
    const response = await fetch("/images");
    const images = await response.json();

    feed.innerHTML = "";

    images.reverse().forEach((imageUrl) => {
      const img = document.createElement("img");

      img.src = imageUrl;
      img.width = 300;

      feed.appendChild(img);
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
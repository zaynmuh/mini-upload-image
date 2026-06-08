function UploadForm({
  caption,
  setCaption,
  setSelectedFile,
  handleUpload,
}) {
  return (
    <form
      className="upload-form"
      onSubmit={handleUpload}
    >
      <input
        type="file"
        onChange={(event) =>
          setSelectedFile(
            event.target.files[0]
          )
        }
      />

      <input
        type="text"
        placeholder="Write caption..."
        value={caption}
        onChange={(event) =>
          setCaption(event.target.value)
        }
      />

      <button type="submit">
        Upload Post
      </button>
    </form>
  );
}

export default UploadForm;
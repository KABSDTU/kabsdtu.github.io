const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxT-6sdH94n4TyP7MchygFr9yaSbfFE0RlJ2lhFaZyAAtoiCi2C2E6mS3-foncsHPiTVg/exec";

const dropZone = document.getElementById("drop-zone");
const fileInput = document.getElementById("file-input");
const statusText = document.getElementById("upload-status");

dropZone.addEventListener("dragover", function (event) {
  event.preventDefault();
  dropZone.classList.add("drag-over");
});

dropZone.addEventListener("dragleave", function () {
  dropZone.classList.remove("drag-over");
});

dropZone.addEventListener("drop", function (event) {
  event.preventDefault();
  dropZone.classList.remove("drag-over");

  const file = event.dataTransfer.files[0];

  if (file) {
    uploadFile(file);
  }
});

fileInput.addEventListener("change", function () {
  const file = fileInput.files[0];

  if (file) {
    uploadFile(file);
  }
});

function uploadFile(file) {
  const maxSizeMB = 10;

  if (file.size > maxSizeMB * 1024 * 1024) {
    statusText.textContent = "Filen er for stor. Maks størrelse er " + maxSizeMB + " MB.";
    return;
  }

  statusText.textContent = "Forbereder upload...";

  const reader = new FileReader();

  reader.onload = function () {
    const payload = {
      fileName: file.name,
      mimeType: file.type || "application/octet-stream",
      fileData: reader.result
    };

    let fakeProgress = 0;

    const progressTimer = setInterval(function () {
      if (fakeProgress < 90) {
        fakeProgress += 5;
        statusText.textContent = "Uploader... " + fakeProgress + "%";
      }
    }, 300);

    fetch(SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify(payload)
    })
      .then(response => response.json())
      .then(data => {
        clearInterval(progressTimer);

        if (data.success) {
          statusText.innerHTML =
            "Filen blev uploadet!<br><a href='" +
            data.fileUrl +
            "' target='_blank'>Åbn fil</a>";
        } else {
          statusText.textContent = "Upload fejlede: " + data.error;
        }
      })
      .catch(error => {
        clearInterval(progressTimer);
        statusText.textContent = "Upload fejlede.";
        console.error(error);
      });
  };

  reader.onerror = function () {
    statusText.textContent = "Kunne ikke læse filen.";
  };

  reader.readAsDataURL(file);
}
// Show selected file name
document.getElementById("fileInput").addEventListener("change", function() {
    let fileName = this.files.length > 0 ? this.files[0].name : "No file chosen";
    document.getElementById("fileName").textContent = fileName;
});


function speakText() {
    let textInput = document.getElementById("textInput").value;
    let fileInput = document.getElementById("fileInput");
    let mouth = document.getElementById("mouth");

    // Check if both empty
    if (textInput.trim() === "" && fileInput.files.length === 0) {
        alert("Please enter text or upload a .txt file");
        return;
    }

    mouth.classList.add("talking");

    // If file uploaded, read it
    if (fileInput.files.length > 0) {
        let reader = new FileReader();

        reader.onload = function(e) {
            sendTextToBackend(e.target.result);
        };

        reader.readAsText(fileInput.files[0]);
    } else {
        sendTextToBackend(textInput);
    }
}


// Send text to Flask backend
function sendTextToBackend(text) {
    fetch("/speak", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "text=" + encodeURIComponent(text)
    });

    // Stop mouth animation after 3 seconds
    setTimeout(() => {
        document.getElementById("mouth").classList.remove("talking");
    }, 3000);
}
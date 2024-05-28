document.getElementById("form").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent the default form submission
    e.preventDefault(); // Prevent the default form submission
    document.getElementById("form-g").textContent = "Submitting..";
    document.getElementById("form-g").style.display = "block";
    document.getElementById("submit").disabled = true;

    // Collect the form data
    var formData = new FormData(this);
    var keyValuePairs = [];
    for (var pair of formData.entries()) {
        keyValuePairs.push(pair[0] + "=" + pair[1]);
    }

    var formDataString = keyValuePairs.join("&");

    // Send a POST request to your Google Apps Script
    fetch(
        "https://script.google.com/macros/s/AKfycbyv4wLmXiHvjo59fxnFGicigPH8gRqquyra7vDVzXR2ihP8cMA4kiaWtY3AW5W06vIQ/exec",
        {
            redirect: "follow",
            method: "POST",
            body: formDataString,
            headers: {
            "Content-Type": "text/plain;charset=utf-8",
            },
        }
        )
    .then(function (response) {
        // Check if the request was successful
        if (response) {
            return response; // Assuming your script returns JSON response
        } else {
            throw new Error("Failed to submit the form.");
            }
        })
    .then(function (data) {
        // Display a success message
        document.getElementById("form-g").textContent =
        "Data submitted successfully!";
        document.getElementById("form-g").style.display = "block";
        document.getElementById("form-g").style.backgroundColor = "green";
        document.getElementById("form-g").style.color = "beige";
        document.getElementById("submit").disabled = false;
        document.getElementById("form").reset();

        setTimeout(function () {
            document.getElementById("form-g").textContent = "";
            document.getElementById("form-g").style.display = "none";
            }, 2600);
        })
        .catch(function (error) {
            // Handle errors, you can display an error message here
            console.error(error);
            document.getElementById("form-g").textContent =
            "An error occurred while submitting the form.";
            document.getElementById("form-g").style.display = "block";
        });
});
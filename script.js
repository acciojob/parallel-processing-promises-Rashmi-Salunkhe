// Array of image URLs
const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
  // You can add more images here
];

// Get references to DOM elements
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

// Function to load a single image and return a promise
function loadImage(image) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = image.url;

    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image's URL: ${image.url}`));
  });
}

// Event listener for the button click
btn.addEventListener("click", () => {
  // Clear previous images and error messages
  output.innerHTML = '';
  const errorMessage = document.getElementById('error-message');
  if (errorMessage) errorMessage.remove();

  // Map each image URL to a promise
  const imagePromises = images.map(image => loadImage(image));

  // Use Promise.all to load all images in parallel
  Promise.all(imagePromises)
    .then(loadedImages => {
      // Append each loaded image to the output div
      loadedImages.forEach(img => output.appendChild(img));
    })
    .catch(error => {
      // Display error message
      const errorMsg = document.createElement('div');
      errorMsg.id = 'error-message';
      errorMsg.textContent = error.message;
      document.querySelector('.container').appendChild(errorMsg);
      console.error(error);
    });
});

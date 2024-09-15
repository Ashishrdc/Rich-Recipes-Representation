export function getJpgFileName(filePath) {
  // Split the path by "/"
  const parts = filePath.split("/");

  // Extract the file name
  const fileName = parts.slice(-1)[0];

  console.log(fileName);
  // Return the file name with the path prepended
  return fileName;
}

export function formatRecipeName(recipeName) {
  // Split the hyphenated string into words
  const words = recipeName.split("-");

  // Capitalize the first letter of each word and join them with spaces
  const formattedName = words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  return formattedName;
}

const PEXELS_API_KEY =
  "m6AR1bSpBbYf2pj4m6xr7m4ZCanJDZwTfGoRxiLfzTLM1LrChPMkEWZ8";
const UNSPLASH_ACCESS_KEY = "B_xlgqc39wTvWWmGJGLj0y3ntaV62DjKbJgyOAFFUPo";

const fetchImageFromPexels = async (ingredient) => {
  try {
    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${ingredient}&per_page=1`,
      {
        headers: {
          Authorization: PEXELS_API_KEY,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Pexels API request failed");
    }

    const data = await response.json();
    return data.photos[0]?.src?.medium; // Return the URL of the first image
  } catch (error) {
    console.error("Error fetching image from Pexels:", error);
    return null; // Return null if there was an error
  }
};

const fetchImageFromUnsplash = async (ingredient) => {
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${ingredient}&per_page=1`,
      {
        headers: {
          Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Unsplash API request failed");
    }

    const data = await response.json();
    return data.results[0]?.urls?.regular; // Return the URL of the first image
  } catch (error) {
    console.error("Error fetching image from Unsplash:", error);
    return null; // Return null if there was an error
  }
};

export const fetchImage = async (ingredient) => {
  // First, try fetching from Pexels
  let imageUrl = await fetchImageFromPexels(ingredient);

  // If no image found on Pexels, try Unsplash
  if (!imageUrl) {
    imageUrl = await fetchImageFromUnsplash(ingredient);
  }

  return imageUrl;
};

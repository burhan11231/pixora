import React from 'react';

function ImageCard({ image, referralLink }) {
  const unsplashUrl = `https://unsplash.com/photos/${image.id}?utm_source=pixora&amp;utm_medium=referral`;
  const viewOnUnsplashUrl = referralLink ? `${unsplashUrl}&amp;${referralLink}` : unsplashUrl;

  // Check if image and image.urls are defined
  if (!image || !image.urls) {
    return null; // Or render a placeholder or error message
  }

  return (
    <div className="image-card">
			<p className="photographer-name">{image.user.name}</p>
      <img src={image.urls.regular} alt={image.alt_description} />
			{/* Display download count if available */}
  {image.downloads && (
    <p className="download-count">{image.downloads.toLocaleString()} Downloads</p>
  )}
      <a
        href={viewOnUnsplashUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="view-on-unsplash-button"
      >
        View on Unsplash
      </a>
      
    </div>
  );
}

export default ImageCard;

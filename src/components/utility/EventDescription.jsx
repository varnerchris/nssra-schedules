import React from "react";

// Function to remove all styles and class names
function stripStylesAndClasses(html) {
  // Remove class attributes
  const classlessHtml = html.replace(/ class="[^"]*"/g, "");

  // Remove style attributes
  const stylelessHtml = classlessHtml.replace(/ style="[^"]*"/g, "");

  return stylelessHtml;
}

function EventDescription({ description, classImport }) {
  const LENGTH = 400; // Max characters to show

  // Truncate the description
  let truncatedDescription = description.substring(0, LENGTH);

  // Add "..." to indicate truncation
  if (description.length > LENGTH) {
    truncatedDescription += "...";
  }

  // Strip styles and classes from the truncated HTML
  const cleanDescription = stripStylesAndClasses(truncatedDescription);

  return (
    <div
      className={classImport}
      dangerouslySetInnerHTML={{ __html: cleanDescription }}
    />
  );
}

export default EventDescription;

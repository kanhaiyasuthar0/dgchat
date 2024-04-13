const fs = require("fs");
const path = require("path");

// Directory containing the images
const imagesDir = path.join(__dirname, "./agencies");

// Normalize filename to a valid JavaScript variable name for import
const normalizeName = (filename) => {
  // Remove file extension and invalid characters, replace spaces and dots
  return filename
    .replace(/\.(jpg|jpeg|png|gif)$/i, "")
    .replace(/[^a-zA-Z0-9_]/g, "_")
    .replace(/\s+/g, "_");
};

// Function to read directory, generate import statements
const generateImports = () => {
  try {
    const files = fs.readdirSync(imagesDir);
    const importStatements = files.map((file) => {
      const variableName = normalizeName(file);
      return `import ${variableName} from "@/data/agencies/${file}"; // ${file.replace(
        /_/g,
        " "
      )}`;
    });

    // Output all import statements
    fs.writeFileSync(
      path.join(__dirname, "imports.js"),
      importStatements.join("\n")
    );
    console.log("Import statements generated successfully!");
  } catch (error) {
    console.error("Failed to generate imports:", error);
  }
};

generateImports();

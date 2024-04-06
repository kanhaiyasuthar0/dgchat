import React from "react";
import { FiHelpCircle } from "react-icons/fi"; // Importing an example icon from React Icons

interface AssistComponentProps {
  // Define props here if needed, for example, to dynamically change the text
  message?: string;
}

const AssistComponent: React.FC<AssistComponentProps> = ({
  message = "How can I assist you today?",
}) => {
  return (
    <div style={styles.container}>
      <FiHelpCircle size={32} style={styles.icon} /> {/* Icon */}
      <p style={styles.text}>{message}</p> {/* Text */}
    </div>
  );
};

// Styling
const styles = {
  container: {
    display: "flex",
    flexDirection: "column", // TypeScript requires the 'as' assertion for non-string values
    alignItems: "center",
    justifyContent: "center",
    height: "100%", // Adjust based on your needs
  } as React.CSSProperties,
  icon: {
    marginBottom: "10px", // Space between icon and text
  } as React.CSSProperties,
  text: {
    fontSize: "16px",
    textAlign: "center",
  } as React.CSSProperties,
};

export default AssistComponent;

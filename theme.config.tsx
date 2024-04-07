import Link from "next/link";

const themeConfig = {
  logo: (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        justifyContent: "center", // Adjust based on md: prefix in your TailwindCSS
        color: "white",
      }}
    >
      <svg
        version="1.0"
        xmlns="http://www.w3.org/2000/svg"
        width="10.000000pt"
        height="10.000000pt"
        viewBox="0 0 630.000000 630.000000"
        preserveAspectRatio="xMidYMid meet"
      >
        <g
          transform="translate(0.000000,630.000000) scale(0.100000,-0.100000)"
          fill="#000000"
          stroke="none"
        ></g>
      </svg>
      <span style={{ marginLeft: "3px", fontSize: "large" }}>Farmer Chat</span>
    </div>
  ),
  project: {
    link: "https://github.com/kanhaiyasuthar0/dgchat",
  },
  footer: {
    text: (
      <span>
        {new Date().getFullYear()} ©{" "}
        <a href="https://nextra.site" target="_blank">
          Farmer Chat
        </a>
        .
      </span>
    ),
  },
  // ... other theme options
};

export default themeConfig;

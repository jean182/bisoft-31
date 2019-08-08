import React from "react"

function Panel({ children, style = {} }) {
  return (
    <div
      className="panel"
      style={{
        fontSize: "0.9em",
        borderRadius: "0.75em",
        padding: "0.75em",
        wordBreak: "keep-all",
        marginBottom: "1rem",
        border: "1px solid var(--panelBorder)",
        ...style,
      }}
    >
      {children}
    </div>
  )
}

export default Panel

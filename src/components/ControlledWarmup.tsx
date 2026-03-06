import { useState } from "react";

export default function ControlledWarmup() {
  const [title, setTitle] = useState("");

  return (
    <label>
      Project title
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="e.g. Portfolio API"
      />
    </label>
  );
}
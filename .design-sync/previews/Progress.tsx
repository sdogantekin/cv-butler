import { Progress } from "cv-butler";

export function Values() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, width: 260 }}>
      <Progress value={25} />
      <Progress value={60} />
      <Progress value={93} />
    </div>
  );
}

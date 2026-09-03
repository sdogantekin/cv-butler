import { Separator } from "cv-butler";

export function Horizontal() {
  return (
    <div style={{ width: 260 }}>
      <p style={{ margin: "0 0 8px", fontSize: 14 }}>Above</p>
      <Separator />
      <p style={{ margin: "8px 0 0", fontSize: 14 }}>Below</p>
    </div>
  );
}

export function Vertical() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, height: 32 }}>
      <span style={{ fontSize: 14 }}>Left</span>
      <Separator orientation="vertical" />
      <span style={{ fontSize: 14 }}>Right</span>
    </div>
  );
}

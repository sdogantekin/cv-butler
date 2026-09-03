import { Input, Label } from "cv-butler";

export function PairedWithInput() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, width: 260 }}>
      <Label htmlFor="preview-email">Email</Label>
      <Input id="preview-email" type="email" placeholder="you@example.com" />
    </div>
  );
}

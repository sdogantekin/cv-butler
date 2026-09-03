import { Input } from "cv-butler";

export function Default() {
  return (
    <div style={{ width: 260 }}>
      <Input type="email" placeholder="you@example.com" />
    </div>
  );
}

export function WithValue() {
  return (
    <div style={{ width: 260 }}>
      <Input defaultValue="ada@example.com" />
    </div>
  );
}

export function Disabled() {
  return (
    <div style={{ width: 260 }}>
      <Input disabled placeholder="Not editable" />
    </div>
  );
}

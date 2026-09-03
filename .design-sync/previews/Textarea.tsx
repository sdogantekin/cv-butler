import { Textarea } from "cv-butler";

export function Default() {
  return (
    <div style={{ width: 300 }}>
      <Textarea placeholder="Paste the job description text here..." rows={4} />
    </div>
  );
}

export function WithValue() {
  return (
    <div style={{ width: 300 }}>
      <Textarea rows={4} defaultValue="Senior Software Engineer, Berlin office. We're looking for someone with strong TypeScript experience." />
    </div>
  );
}

export function Disabled() {
  return (
    <div style={{ width: 300 }}>
      <Textarea rows={3} disabled placeholder="Not editable" />
    </div>
  );
}

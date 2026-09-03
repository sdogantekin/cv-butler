import { Card, CardDescription, CardHeader, CardTitle } from "cv-butler";

export function InContext() {
  return (
    <Card style={{ width: 300 }}>
      <CardHeader>
        <CardTitle>Job Match</CardTitle>
        <CardDescription>Paste a job description to see your fit.</CardDescription>
      </CardHeader>
    </Card>
  );
}

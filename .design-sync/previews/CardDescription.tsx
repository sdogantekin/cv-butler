import { Card, CardDescription, CardHeader, CardTitle } from "cv-butler";

export function InContext() {
  return (
    <Card style={{ width: 300 }}>
      <CardHeader>
        <CardTitle>Skills</CardTitle>
        <CardDescription>Generate a cover letter grounded entirely in your real resume.</CardDescription>
      </CardHeader>
    </Card>
  );
}

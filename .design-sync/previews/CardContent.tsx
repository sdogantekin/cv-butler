import { Card, CardContent, CardHeader, CardTitle } from "cv-butler";

export function InContext() {
  return (
    <Card style={{ width: 300 }}>
      <CardHeader>
        <CardTitle>Education</CardTitle>
      </CardHeader>
      <CardContent>
        <p style={{ margin: 0, fontSize: 14, color: "var(--muted-foreground)" }}>
          MSc Mathematics, University of London.
        </p>
      </CardContent>
    </Card>
  );
}

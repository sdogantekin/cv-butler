import { Badge, Button, Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "cv-butler";

export function Simple() {
  return (
    <Card style={{ width: 280 }}>
      <CardHeader>
        <CardTitle>ATS Score</CardTitle>
        <CardDescription>Upload your resume and get an overall ATS-parsability score.</CardDescription>
      </CardHeader>
    </Card>
  );
}

export function WithActionAndFooter() {
  return (
    <Card style={{ width: 320 }}>
      <CardHeader>
        <CardTitle>Match Score: 78/100</CardTitle>
        <CardDescription>Skills, Experience, and Education breakdown</CardDescription>
        <CardAction>
          <Badge variant="secondary">2 gaps</Badge>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p style={{ margin: 0, fontSize: 14, color: "var(--muted-foreground)" }}>
          Strong skills match. Missing Kubernetes experience for this role.
        </p>
      </CardContent>
      <CardFooter>
        <Button size="sm">View full report</Button>
      </CardFooter>
    </Card>
  );
}

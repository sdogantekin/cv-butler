import { Badge, Card, CardAction, CardHeader, CardTitle } from "cv-butler";

export function InContext() {
  return (
    <Card style={{ width: 300 }}>
      <CardHeader>
        <CardTitle>Experience</CardTitle>
        <CardAction>
          <Badge variant="destructive">1 gap</Badge>
        </CardAction>
      </CardHeader>
    </Card>
  );
}

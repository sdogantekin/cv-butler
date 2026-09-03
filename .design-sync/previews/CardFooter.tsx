import { Button, Card, CardFooter, CardHeader, CardTitle } from "cv-butler";

export function InContext() {
  return (
    <Card style={{ width: 300 }}>
      <CardHeader>
        <CardTitle>Requirements</CardTitle>
      </CardHeader>
      <CardFooter>
        <Button size="sm">See details</Button>
      </CardFooter>
    </Card>
  );
}

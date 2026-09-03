import { Tabs, TabsContent, TabsList, TabsTrigger } from "cv-butler";

export function InContext() {
  return (
    <Tabs defaultValue="score" style={{ width: 300 }}>
      <TabsList>
        <TabsTrigger value="score">ATS Score</TabsTrigger>
      </TabsList>
      <TabsContent value="score">
        <p style={{ margin: 0, fontSize: 14, color: "var(--muted-foreground)" }}>
          Upload a resume to get an ATS-parsability score.
        </p>
      </TabsContent>
    </Tabs>
  );
}

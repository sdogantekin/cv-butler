import { Tabs, TabsContent, TabsList, TabsTrigger } from "cv-butler";

export function Default() {
  return (
    <Tabs defaultValue="score" style={{ width: 320 }}>
      <TabsList>
        <TabsTrigger value="score">ATS Score</TabsTrigger>
        <TabsTrigger value="match">Job Match</TabsTrigger>
      </TabsList>
      <TabsContent value="score">
        <p style={{ margin: 0, fontSize: 14, color: "var(--muted-foreground)" }}>
          Upload a resume to get an ATS-parsability score.
        </p>
      </TabsContent>
      <TabsContent value="match">
        <p style={{ margin: 0, fontSize: 14, color: "var(--muted-foreground)" }}>
          Paste a job description to see your match score.
        </p>
      </TabsContent>
    </Tabs>
  );
}

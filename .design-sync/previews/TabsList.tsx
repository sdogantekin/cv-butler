import { Tabs, TabsList, TabsTrigger } from "cv-butler";

export function InContext() {
  return (
    <Tabs defaultValue="score" style={{ width: 280 }}>
      <TabsList>
        <TabsTrigger value="score">ATS Score</TabsTrigger>
        <TabsTrigger value="match">Job Match</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}

export function ProcessingIndicator({ title }: { title: string }) {
  return (
    <div className="max-w-md py-20 text-center">
      <div className="mx-auto mb-6 size-10 animate-spin rounded-full border-[3px] border-border border-t-primary" />
      <div className="mb-2 text-base font-semibold">{title}</div>
      <p className="text-sm text-muted-foreground">This usually takes under a minute.</p>
    </div>
  );
}

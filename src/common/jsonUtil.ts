export function downloadJSON(data: unknown, label = "state"): void {
  const url = URL.createObjectURL(
    new Blob([JSON.stringify(data, null, 4)], { type: "application/json" }),
  );
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");

  const link = document.createElement("a");
  link.href = url;
  link.download = `${label}.${stamp}.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();

  // give the browser a moment to start the download before releasing the blob
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export async function uploadJSON(event: Event): Promise<unknown> {
  const input = event.target as HTMLInputElement | null;
  const file = input?.files?.[0];
  if (!file) throw new Error("No file selected.");

  try {
    return JSON.parse(await file.text());
  } finally {
    // allow selecting the same file again
    if (input) input.value = "";
  }
}

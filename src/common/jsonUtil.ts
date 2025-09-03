import { v4 as uuid } from "uuid";
import fileSaver from "file-saver";

export function downloadJSON(data: Object, label = "state"): void {
  fileSaver.saveAs(
    new Blob([JSON.stringify(data, null, 4)], { type: "application/json" }),
    label + "." + uuid() + ".json",
  );
}

export async function uploadJSON(event: Event): Promise<Object> {
  return new Promise((resolve, reject) => {
    const target = event.target as unknown as { files: File[] };
    const file: File = target?.files[0];

    const reader = new FileReader();

    reader.onload = (e) => {
      if (!e.target) throw new Error("No event target.");
      if (!e.target.result) throw new Error("No target results.");

      resolve(JSON.parse(e.target.result as string));
    };
    reader.onerror = (err) => reject(err);
    reader.readAsText(file);
  });
}

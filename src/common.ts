import { v4 as uuid } from "uuid";
import fileSaver from "file-saver";

export function downloadJSON(data: Object, label = "state"): void {
  fileSaver.saveAs(
    new Blob([JSON.stringify(data, null, 4)], { type: "application/json" }),
    label + "." + uuid() + ".json",
  );
}

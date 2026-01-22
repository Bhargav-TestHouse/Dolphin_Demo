export function shouldExecute(row: any): boolean {
  const currentEnv = String(process.env.ENV || "").trim().toLowerCase();

  // support both Run/run
  const runValue = String(row.Run ?? row.run ?? "")
    .trim()
    .toLowerCase();

  const runFlag = runValue === "yes";

  // support both Env/env
  const envValue = String(row.Env ?? row.env ?? "");

  const envMatch = envValue
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .includes(currentEnv);

  return runFlag && envMatch;
}
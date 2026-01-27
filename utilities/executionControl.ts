import { LoginTestRow } from "./utility";

export function shouldExecute(
  row: LoginTestRow,
  envControl: Map<string, boolean>
): boolean {

  // 1️⃣ Current ENV
  const currentEnv = String(process.env.ENV || "")
    .trim()
    .toLowerCase();

  // 2️⃣ Row run flag
  const runFlag = row.run.trim().toLowerCase() === "yes";

  // 3️⃣ Row env match
  const rowEnvMatch = row.env
    .split(",")
    .map(e => e.trim().toLowerCase())
    .includes(currentEnv);

  // 4️⃣ Global env switch
  const envEnabled = envControl.get(currentEnv) === true;

  return runFlag && rowEnvMatch && envEnabled;
}


// export function shouldExecute(row: any): boolean {
//   const currentEnv = String(process.env.ENV || "").trim().toLowerCase();

//   // support both Run/run
//   const runValue = String(row.Run ?? row.run ?? "")
//     .trim()
//     .toLowerCase();

//   const runFlag = runValue === "yes";

//   // support both Env/env
//   const envValue = String(row.Env ?? row.env ?? "");

//   const envMatch = envValue
//     .split(",")
//     .map((e) => e.trim().toLowerCase())
//     .includes(currentEnv);

//   return runFlag && envMatch;
// }
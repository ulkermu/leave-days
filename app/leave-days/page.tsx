import { Toaster } from "react-hot-toast";
import AddRegularLeave from "./AddRegularLeave";
import LeaveDaysTable from "./LeaveDaysTable";

const LeaveDays = () => {
  return (
    <main className="flex max-w-[1280px] w-full p-5">
      <Toaster position="top-right" />
      <div className="flex flex-col gap-5 w-full">
        <LeaveDaysTable />
        <AddRegularLeave />
      </div>
    </main>
  );
};

export default LeaveDays;

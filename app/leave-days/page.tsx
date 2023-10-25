import { Toaster } from "react-hot-toast";
import {
  AddAnnualLeave,
  AddRegularLeave,
  LeaveDaysTable,
  ReviewPastLeaves,
} from ".";

const LeaveDays = () => {
  return (
    <main className="flex max-w-[1280px] w-full p-5">
      <Toaster position="top-right" />
      <AddAnnualLeave />
      <AddRegularLeave />
      <ReviewPastLeaves />
      <div className="flex flex-col gap-5 w-full">
        <LeaveDaysTable />
      </div>
    </main>
  );
};

export default LeaveDays;

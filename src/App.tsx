import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import OrganizationPage from "@/pages/OrganizationPage";
import EmployeePage from "@/pages/EmployeePage";

const App: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<OrganizationPage />} />
      <Route path="/organization/:id/employees" element={<EmployeePage />} />
    </Routes>
  );
};

export default App;

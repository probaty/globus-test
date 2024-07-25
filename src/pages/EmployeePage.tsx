import { RootState } from "@/shared/store";
import { Employee, Organization } from "@/types";
import { EmployeeList } from "@/widgets/EmployeeList";
import { ArrowBack } from "@mui/icons-material";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const EmployeePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const organizationExists = useSelector((state: RootState) =>
    state.organizations.list.find((org: Organization) => org.id === id)
  );

  const employees = useSelector(
    (state: RootState) => state.employees.list
  ).filter((emp: Employee) => emp.organizationId === id);

  useEffect(() => {
    if (!organizationExists) {
      navigate("/");
    }
  }, [organizationExists, navigate]);

  return (
    <Stack alignItems="flex-start" padding={3} gap={3}>
      <Box display="flex" gap={1}>
        <IconButton onClick={() => navigate("/")}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h4">Employees</Typography>
      </Box>
      {organizationExists && (
        <EmployeeList
          employees={employees}
          organizationId={organizationExists.id}
        />
      )}
    </Stack>
  );
};

export default EmployeePage;

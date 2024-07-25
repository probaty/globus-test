import { EmployeeModal } from "@/feature/EmployeeModal";
import { deleteEmployee } from "@/shared/store";
import { Employee } from "@/types";
import { Delete, Edit } from "@mui/icons-material";
import {
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { FC, MouseEvent, useState } from "react";
import { useDispatch } from "react-redux";

interface EmployeeListProps {
  employees: Employee[];
  organizationId: string;
}

export const EmployeeList: FC<EmployeeListProps> = ({
  employees,
  organizationId,
}) => {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  const handleAddEmployee = () => {
    setEditingEmployee(null);
    setModalOpen(true);
  };

  const handleEditEmployee = (emp: Employee) => {
    setEditingEmployee(emp);
    setModalOpen(true);
  };

  const handleDeleteEmployee = (id: string) => {
    dispatch(deleteEmployee(id));
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingEmployee(null);
  };

  const handleClick = (
    e: MouseEvent<HTMLButtonElement>,
    callback: () => void
  ) => {
    e.stopPropagation();
    callback();
  };

  return (
    <>
      <Button onClick={handleAddEmployee} variant="contained">
        Add Employee
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Position</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map((emp) => (
            <TableRow key={emp.id}>
              <TableCell>{emp.firstName}</TableCell>
              <TableCell>{emp.lastName}</TableCell>
              <TableCell>{emp.position}</TableCell>
              <TableCell align="right" sx={{ display: "flex", gap: 2 }}>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={(e) =>
                    handleClick(e, () => handleDeleteEmployee(emp.id))
                  }
                >
                  <Delete />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="edit"
                  onClick={(e) => handleClick(e, () => handleEditEmployee(emp))}
                >
                  <Edit />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <EmployeeModal
        open={modalOpen}
        onClose={handleCloseModal}
        employee={editingEmployee}
        organizationId={organizationId}
      />
    </>
  );
};

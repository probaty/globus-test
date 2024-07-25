import { addEmployee, updateEmployee } from "@/shared/store";
import { useStylesModal } from "@/shared/styels/modal";
import { Employee } from "@/types";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { FC } from "react";
import { useDispatch } from "react-redux";
import * as yup from "yup";

interface EmployeeModalProps {
  open: boolean;
  onClose: () => void;
  employee: Employee | null;
  organizationId: string;
}

type EmployeeFromValues = Omit<Employee, "id" | "organizationId">;

const organizationFromSchema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  position: yup.string().required("Position is required"),
});

export const EmployeeModal: FC<EmployeeModalProps> = ({
  open,
  onClose,
  employee,
  organizationId,
}) => {
  const { classes } = useStylesModal();
  const dispatch = useDispatch();

  const initialValues: EmployeeFromValues = employee
    ? { ...employee }
    : { firstName: "", lastName: "", position: "" };

  const handleSubmit = (values: EmployeeFromValues) => {
    if (employee) {
      dispatch(updateEmployee(values as Employee));
    } else {
      dispatch(addEmployee({ ...values, organizationId } as Employee));
    }
    formik.resetForm();
    onClose();
  };

  const formik = useFormik({
    initialValues,
    validationSchema: organizationFromSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  return (
    <Modal open={open} onClose={onClose}>
      <Box className={classes.modal}>
        <Typography variant="h6" className={classes.header}>
          {employee ? "Edit" : "Add"} Employee
        </Typography>
        <form className={classes.form} onSubmit={formik.handleSubmit}>
          <TextField
            name="firstName"
            label="First Name"
            fullWidth
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />

          <TextField
            name="lastName"
            label="Last Name"
            fullWidth
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />

          <TextField
            name="position"
            label="Position"
            fullWidth
            value={formik.values.position}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.position && Boolean(formik.errors.position)}
            helperText={formik.touched.position && formik.errors.position}
          />
          <Button type="submit" variant="contained" color="primary">
            {employee ? "Update" : "Add"}
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

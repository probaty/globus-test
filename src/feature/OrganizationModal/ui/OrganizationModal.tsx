import { addOrganization, updateOrganization } from "@/shared/store";
import { Organization } from "@/types";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { FC } from "react";
import { useDispatch } from "react-redux";
import { tss } from "tss-react/mui";
import * as yup from "yup";

const useStyles = tss.create(({ theme }) => ({
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    backgroundColor: theme.palette.background.default,
    boxShadow: theme.shadows[24],
    padding: theme.spacing(4),
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
  },
  header: {
    marginBottom: theme.spacing(2),
  },
}));

interface OrganizationModalProps {
  open: boolean;
  onClose: () => void;
  organization: Organization | null;
}

type OrganizationFromValues = Omit<Organization, "id">;

const organizationFromSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  address: yup.string().required("Address is required"),
});

export const OrganizationModal: FC<OrganizationModalProps> = ({
  open,
  onClose,
  organization,
}) => {
  const { classes } = useStyles();
  const dispatch = useDispatch();

  const initialValues: OrganizationFromValues = organization
    ? { ...organization }
    : { name: "", address: "" };

  const handleSubmit = (values: OrganizationFromValues) => {
    if (organization) {
      dispatch(updateOrganization(values as Organization));
    } else {
      dispatch(addOrganization({ ...values }));
    }
    formik.resetForm();
    onClose();
  };

  const formik = useFormik({
    initialValues,
    validationSchema: organizationFromSchema,
    onSubmit: handleSubmit,
  });

  return (
    <Modal open={open} onClose={onClose}>
      <Box className={classes.modal}>
        <Typography variant="h6" className={classes.header}>
          {organization ? "Edit" : "Add"} Organization
        </Typography>
        <form className={classes.form} onSubmit={formik.handleSubmit}>
          <TextField
            name="name"
            label="Name"
            fullWidth
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            name="address"
            label="Address"
            fullWidth
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.address && Boolean(formik.errors.address)}
            helperText={formik.touched.address && formik.errors.address}
          />
          <Button type="submit" variant="contained" color="primary">
            {organization ? "Update" : "Add"}
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

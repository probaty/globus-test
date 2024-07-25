import { FC, MouseEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  IconButton,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { Organization } from "@/types";
import { deleteOrganization, RootState } from "@/shared/store";
import { OrganizationModal } from "@/feature/OrganizationModal";

export const OrganizationList: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const organizations = useSelector(
    (state: RootState) => state.organizations.list
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [editingOrganization, setEditingOrganization] =
    useState<Organization | null>(null);

  const handleAddOrganization = () => {
    setEditingOrganization(null);
    setModalOpen(true);
  };

  const handleEditOrganization = (organization: Organization) => {
    setEditingOrganization(organization);
    setModalOpen(true);
  };

  const handleDeleteOrganization = (id: string) => {
    dispatch(deleteOrganization(id));
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingOrganization(null);
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
      <Button onClick={handleAddOrganization} variant="contained">
        Add Organization
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Address</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {organizations.map((org) => (
            <TableRow
              key={org.id}
              onClick={() => navigate(`/organization/${org.id}/employees`)}
              sx={{
                cursor: "pointer",
                "&:hover": { backgroundColor: "#00000014" },
              }}
            >
              <TableCell>{org.name}</TableCell>
              <TableCell>{org.address}</TableCell>
              <TableCell align="right" sx={{ display: "flex", gap: 2 }}>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={(e) =>
                    handleClick(e, () => handleDeleteOrganization(org.id))
                  }
                >
                  <Delete />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="edit"
                  onClick={(e) =>
                    handleClick(e, () => handleEditOrganization(org))
                  }
                >
                  <Edit />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <OrganizationModal
        open={modalOpen}
        onClose={handleCloseModal}
        organization={editingOrganization}
      />
    </>
  );
};

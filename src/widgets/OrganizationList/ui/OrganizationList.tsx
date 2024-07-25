import { OrganizationModal } from "@/feature/OrganizationModal";
import { deleteOrganization } from "@/shared/store";
import { Organization } from "@/types";
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
import { useNavigate } from "react-router-dom";

interface OrganizationListProps {
  organizations: Organization[];
}

export const OrganizationList: FC<OrganizationListProps> = ({
  organizations,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
              onClick={() => navigate(`/organization/${org.id}`)}
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

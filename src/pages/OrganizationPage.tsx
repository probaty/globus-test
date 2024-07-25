import { RootState } from "@/shared/store";
import { OrganizationList } from "@/widgets/OrganizationList";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import { useSelector } from "react-redux";

const OrganizationPage: FC = () => {
  const organizations = useSelector(
    (state: RootState) => state.organizations.list
  );
  return (
    <Stack alignItems="flex-start" padding={3} gap={3}>
      <Typography variant="h4">Organizations</Typography>
      {organizations.length === 0 ? (
        <Typography variant="body1">No organizations found</Typography>
      ) : (
        <OrganizationList organizations={organizations} />
      )}
    </Stack>
  );
};

export default OrganizationPage;

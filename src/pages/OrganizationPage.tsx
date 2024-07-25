import { OrganizationList } from "@/widgets/OrganizationList";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";

const OrganizationPage: FC = () => {
  return (
    <Stack alignItems="flex-start" padding={3} gap={3}>
      <Typography variant="h4">Organizations</Typography>
      <OrganizationList />
    </Stack>
  );
};

export default OrganizationPage;

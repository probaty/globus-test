import { tss } from "tss-react/mui";

export const useStylesModal = tss.create(({ theme }) => ({
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

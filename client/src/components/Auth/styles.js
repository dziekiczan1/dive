import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  textfield: {
    marginTop: "1rem",
    padding: "1rem",
    backgroundColor: "var(--black-color)",
    border: "1px solid var(--secondary-color)",
    color: "white",
    input: {
      color: "blue",
    },
    focused: {
      background: "red",
    },
  },
}));

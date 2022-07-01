import React, { useEffect } from "react";
import { Pagination, PaginationItem } from "@material-ui/lab";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { getPostsAdmin } from "../../actions/posts";
import "./Pagination.scss";

const PaginateAdmin = ({ page }) => {
  const { numberOfPages } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    if (page) dispatch(getPostsAdmin(page));
  }, [page]);

  const useStyles = makeStyles(() => ({
    root: {
      "& .MuiPaginationItem-root": {
        backgroundColor: "var(--black-color)",
        color: "var(--secondary-color)",
        borderRadius: "50%",
        width: "30px",
        height: "30px",
      },
      "& .Mui-selected": {
        border: "2px solid var(--secondary-color)",
        boxShadow: "0 0 1em var(--secondary-color)",
      },
      "& .Mui-selected:hover": {
        backgroundColor: "var(--black-color)",
      },
      "& .Mui-disabled": {
        backgroundColor: "var(--black-color)",
        opacity: 0.5,
      },
      "& .MuiPaginationItem-page:hover": {
        boxShadow: "0 0 1em var(--secondary-color)",
      },
    },
  }));

  const classes = useStyles();
  return (
    <Pagination
      className={classes.root}
      count={numberOfPages}
      pagea={Number(page) || 1}
      renderItem={(item) => (
        <PaginationItem
          {...item}
          component={Link}
          to={`/admin?page=${item.page}`}
          className="item"
        />
      )}
    />
  );
};

export default PaginateAdmin;

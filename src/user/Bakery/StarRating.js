import * as React from "react";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

const StarRating = (props) => {
    return (
        <Stack spacing={1}>
            <Rating name="half-rating" value={props.selectedStars} precision={0.5} onChange={props.onChange} />
        </Stack>
    );
};

export default StarRating;

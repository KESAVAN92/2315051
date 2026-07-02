import {

FormControl,

InputLabel,

Select,

MenuItem

} from "@mui/material";

export default function NotificationFilter({

value,

onChange

}){

return(

<FormControl fullWidth>

<InputLabel>

Filter

</InputLabel>

<Select

value={value}

label="Filter"

onChange={onChange}

>

<MenuItem value="All">

All

</MenuItem>

<MenuItem value="Placement">

Placement

</MenuItem>

<MenuItem value="Result">

Result

</MenuItem>

<MenuItem value="Event">
Event
</MenuItem>
</Select>
</FormControl>
);
}
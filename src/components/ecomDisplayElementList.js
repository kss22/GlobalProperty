import React, { useRef, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import { IconButton } from "@mui/material";
import { FaTrash } from "react-icons/fa";
import validations from "../utils/validations";

const ListItemComponent = ({
  value,
  index,
  paddingMap,
  onDragStart,
  onDragEnter,
  onDragEnd,
  ecomElementsByUser
}) => {
  const [lengthValidationError, setLengthValidationError] = useState(false);
  const [lengthValidationMessage, setLengthValidationMessage] = useState("");

  const [paddingValueValidationError, setPaddingValueValidationError] =
    useState(false);
  const [paddingValueValidationMessage, setPaddingValueValidationMessage] =
    useState("");

  const handleChangeElementLength = (e) => {
    setLengthValidationError(false);

    const value = e.target.value;

    validations.ecomElementLength
      .validate(value)
      .then(() => {
        setLengthValidationError(false);
        setLengthValidationMessage(null);
      })
      .catch((error) => {
        setLengthValidationError(true);
        setLengthValidationMessage(error.message);
      });
  };

  const handleChangeElementPaddingValue = (e) => {
    setPaddingValueValidationError(false);

    const value = e.target.value;

    validations.ecomElementPaddingValue
      .validate(value)
      .then(() => {
        setPaddingValueValidationError(false);
        setPaddingValueValidationMessage(null);
      })
      .catch((error) => {
        setPaddingValueValidationError(true);
        setPaddingValueValidationMessage(error.message);
      });
  };
  function getKeyFromValue(value, map) {
    for (const [key, val] of Object.entries(map)) {
      if (val === value) {
        return key;
      }
    }
    return null;
  }

  return (
    <ListItem
      onDragStart={(e) => onDragStart(e, index)}
      onDragEnter={(e) => onDragEnter(e, index)}
      onDragEnd={onDragEnd}
      draggable="true"
      key={value.ecomDetailId}
      disablePadding
      sx={{
        border: "1px solid gray",
        borderRadius: "4px",
        width: "100%",
        height: 100,
      }}
    >
      <ListItemIcon sx={{ marginLeft: 5 }}>
        <DragHandleIcon edge="start" />
      </ListItemIcon>

      <ListItemText
        sx={{
          width: 150,
        }}
        primary={value.ecomElement.elementName}
      />

      <TextField
        variant="outlined"
        size="small"
        label="Length"
        sx={{ width: 150 }}
        type="number"
        inputProps={{
          maxLength: 3,
        }}
        error={lengthValidationError}
        helperText={lengthValidationMessage}
        value={value.elementLength}
        onChange={(e) => {
          handleChangeElementLength(e);
          value.elementLength = e.target.value;
        }}
      />
      <ListItemText primary="" />
      <FormControl sx={{ m: 1, width: 150 }} size="small">
        <InputLabel id="select-padding-type">
          {getKeyFromValue(parseInt(value.elementPaddingType), paddingMap)}
        </InputLabel>
        <Select
          labelId="select-institution"
          label="Institution"
          onChange={(e) => (value.elementPaddingType = e.target.value)}
        >
          <MenuItem value={paddingMap["Right Padding"]}>
            {"Right Padding"}
          </MenuItem>
          <MenuItem value={paddingMap["Left Padding"]}>
            {"Left Padding"}
          </MenuItem>
        </Select>
      </FormControl>
      <ListItemText primary="" />
      <TextField
        variant="outlined"
        size="small"
        label="Padding Value"
        type="text"
        error={paddingValueValidationError}
        helperText={paddingValueValidationMessage}
        onChange={(e) => {
          handleChangeElementPaddingValue(e);
          value.elementPaddingValue = e.target.value;
        }}
        sx={{ width: 150 }}
        value={value.elementPaddingValue}
      />
      <IconButton
        sx={{ color: "#ff0000", width: 40, margin: 2 }}
        onClick={() =>
          ecomElementsByUser.length ? ecomElementsByUser.splice(index, 1) : {}
        }
      >
        <FaTrash />
      </IconButton>
    </ListItem>
  );
};

const EcomDisplayElementList = ({
  ecomElementsByUser,
  setEcomElementsByUser,
}) => {
  const paddingMap = {
    "Padding Type": 0,
    "Right Padding": 1,
    "Left Padding": 2,
  };

  const dragItem = useRef();
  const dragOverItem = useRef();

  const dragStart = (e, position) => {
    dragItem.current = position;
  };

  const dragEnter = (e, position) => {
    dragOverItem.current = position;
  };

  const drop = (e) => {
    const copyListItems = [...ecomElementsByUser];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setEcomElementsByUser(copyListItems);
  };

  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      {ecomElementsByUser.map((value, index) => {
        return (
          <ListItemComponent
            key={value.ecomDetailId}
            value={value}
            index={index}
            paddingMap={paddingMap}
            onDragStart={dragStart}
            onDragEnter={dragEnter}
            onDragEnd={drop}
            ecomElementsByUser={ecomElementsByUser}
          />
        );
      })}
    </List>
  );
};

export default EcomDisplayElementList;

import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 300,
        },
    },
};

function getStyles(name, personName, theme) {
    return {
        fontWeight: personName.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
        fontSize: 12,
    };
}

export default function MultipleSelectChip({ bakeryMenus, selectedMenu, onMenuSelection, onDeleteMenu }) {
    const theme = useTheme();
    const [personName, setPersonName] = React.useState(selectedMenu.map((menu) => menu.menuname));

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(Array.isArray(value) ? value : [value]);
        onMenuSelection(value); // 메뉴 선택 핸들러 호출
    };

    const handleDeleteMenu = (menu) => {
        const updatedPersonName = personName.filter((item) => item !== menu);
        setPersonName(updatedPersonName);
        onDeleteMenu(updatedPersonName); // 메뉴 삭제 핸들러 호출
        onMenuSelection(updatedPersonName); // 메뉴 선택 핸들러 호출
    };

    if (!bakeryMenus) {
        return null;
    }

    return (
        <div>
            <FormControl className="col-md-2" sx={{ m: 1, width: 190 }}>
                <InputLabel id="demo-multiple-chip-label">메뉴</InputLabel>
                <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={personName}
                    onChange={handleChange}
                    input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                    renderValue={(selected) => (
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                            {selected.map((value) => (
                                <div key={value} style={{ display: "flex", alignItems: "center", marginRight: "5px" }}>
                                    <Chip label={value} style={{ fontSize: 12 }} onDelete={() => handleDeleteMenu(value)} />
                                </div>
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {bakeryMenus.map((menu) => (
                        <MenuItem key={menu.menuname} value={menu.menuname} style={getStyles(menu.menuname, personName, theme)}>
                            {menu.menuname}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}

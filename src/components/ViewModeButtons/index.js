import ToggleButton from "@material-ui/lab/ToggleButton";
import { VIEW_MODE } from "../../constants/viewMode";
import ViewModuleIcon from "@material-ui/icons/ViewModule";
import ViewListIcon from "@material-ui/icons/ViewList";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";

export const ViewModeButtons = ({ viewMode, setViewMode }) => {
  const handleChangeViewMode = (event, nextView) => {
    setViewMode(nextView);
  };

  return (
    <ToggleButtonGroup
      value={viewMode}
      size="small"
      exclusive
      onChange={handleChangeViewMode}
    >
      <ToggleButton value={VIEW_MODE.GRID} aria-label="Grid view mode">
        <ViewModuleIcon />
      </ToggleButton>
      <ToggleButton value={VIEW_MODE.TABLE} aria-label="Data view mode">
        <ViewListIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  )
}
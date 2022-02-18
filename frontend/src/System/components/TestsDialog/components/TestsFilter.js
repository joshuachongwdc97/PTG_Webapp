import React from "react";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { MenuItem } from "@mui/material";
import { Grid } from "@mui/material";

// COMPONENTS
import TestDetCard from "./TestDetCard";

// ICONS
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const TestsFilter = (props) => {
  let options = [];

  // get all drive programs, drive types, and tests to display as options
  props.tests.forEach((test) => {
    const drvPrgm = props.drvPrgms.filter((prgm) => {
      return prgm.id === test.drvPrgm;
    })[0].alias;
    const drvType = test.drvType;
    const testType = test.test;
    const currentOptions = options.map((opt) => opt.name);

    if (!currentOptions.includes(drvPrgm)) {
      options.push({ category: "Drive Programs", name: drvPrgm });
    }
    if (!currentOptions.includes(drvType)) {
      options.push({ category: "Drive Types", name: drvType });
    }
    if (!currentOptions.includes(testType)) {
      options.push({ category: "Tests", name: testType });
    }
  });

  // sort options alphabetically to be grouped under categories
  options.sort((a, b) => (a.category > b.category ? 1 : -1));

  const submitFilterHandler = (selectedFilters) => {
    // separate selected filters into respective categories
    let filters = { "Drive Programs": [], "Drive Types": [], Tests: [] };

    selectedFilters.forEach((filter) => {
      filters[filter.category].push(filter.name);
    });

    // filter tests that satisfy filter conditions
    let filteredTests = props.tests.filter((test) => {
      let isValid = true;

      if (
        filters["Drive Programs"].length &&
        !filters["Drive Programs"].includes(
          props.drvPrgms.find((drv) => drv.id === test.drvPrgm).alias
        )
      ) {
        isValid = false;
      } else if (
        filters["Drive Types"].length &&
        !filters["Drive Types"].includes(test.drvType)
      ) {
        isValid = false;
      } else if (
        filters["Tests"].length &&
        !filters["Tests"].includes(test.test)
      ) {
        isValid = false;
      }

      return isValid;
    });

    // convert filtered tests into JSX
    filteredTests = filteredTests.map((test) => (
      <Grid item xs={3} key={test.id}>
        <TestDetCard test={test} drvPrgms={props.drvPrgms} key={test.id} />
      </Grid>
    ));

    props.setTestDetCards(filteredTests);
  };

  return (
    <Autocomplete
      multiple
      options={options}
      disableCloseOnSelect
      getOptionLabel={(option) => option.name}
      groupBy={(option) => option.category}
      renderOption={(props, option, { selected }) => (
        <MenuItem {...props}>
          <Checkbox
            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
            checkedIcon={<CheckBoxIcon fontSize="small" />}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.name}
        </MenuItem>
      )}
      renderInput={(params) => <TextField {...params} label="Custom Filter" />}
      isOptionEqualToValue={(option, value) => option.name === value.name}
      onChange={(event, value) => submitFilterHandler(value)}
    />
  );
};

export default TestsFilter;

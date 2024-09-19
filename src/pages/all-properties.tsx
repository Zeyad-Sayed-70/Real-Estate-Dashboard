import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Stack,
  FormControl,
  Select,
  MenuItem,
  Paper,
  IconButton,
  InputBase,
  GridSearchIcon,
  Pagination,
} from "@pankod/refine-mui";
import { CustomButton } from "components";
import { motion } from "framer-motion";

import AddIcon from "@mui/icons-material/Add";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import KingBedIcon from "@mui/icons-material/KingBed";

import propertiesData from "../data/properties.json";
import { filtersData } from "constatns/property";
import { useNavigate } from "@pankod/refine-react-router-v6";

interface FiltersSelected {
  search: string;
  status: string;
  type: string;
  country: string;
  state: string;
}

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const FiltersFroms = ({
  filterSelected,
  setFilterSelected,
}: {
  filterSelected: FiltersSelected;
  setFilterSelected: (value: FiltersSelected) => void;
}) => (
  <Stack
    direction="row"
    flexWrap="wrap"
    justifyContent="space-between"
    sx={{ gap: 2 }}
  >
    <Paper
      component="form"
      sx={{
        flex: 1,
        p: "4px 6px",
        display: "flex",
        alignItems: "center",
        minWidth: 300,
        backgroundColor: "#F7F7F7",
        height: 45,
        boxShadow: "none",
      }}
    >
      <IconButton sx={{ p: "10px" }} aria-label="menu">
        <GridSearchIcon />
      </IconButton>
      <InputBase
        onChange={(e) =>
          setFilterSelected({ ...filterSelected, search: e.target.value })
        }
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search"
        inputProps={{ "aria-label": "search" }}
      />
    </Paper>

    {Object.keys(filtersData)?.map((select, ind) => {
      const fs = select as "status" | "type" | "country" | "state";
      return (
        <FormControl
          key={ind}
          sx={{
            m: 1,
            minWidth: 120,
            flex: 1,
            mt: 0,
            "&:hover": { borderColor: "red" },
          }}
        >
          <Select
            sx={{
              backgroundColor: "#F7F7F7",
              color: "#333",
              height: 45,
              pl: 1,
              textTransform: "capitalize",
            }}
            value={filterSelected[fs]}
            onChange={(e) =>
              setFilterSelected({ ...filterSelected, [fs]: e.target.value })
            }
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            variant="standard"
            color="info"
          >
            {filtersData[fs]?.map((item, ind) => (
              <MenuItem
                sx={{ textTransform: "capitalize" }}
                key={ind}
                value={item}
              >
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      );
    })}
  </Stack>
);

const AllProperty = () => {
  const [filterSelected, setFilterSelected] = useState<FiltersSelected>({
    search: "",
    status: filtersData["status"][0],
    type: filtersData["type"][0],
    state: filtersData["state"][0],
    country: filtersData["country"][0],
  });
  const [pagination, setPagination] = useState<number>(1);
  const [data, setData] = useState(propertiesData.slice(0, 10));
  const [pagNum, setPagNum] = useState<number>(1);
  const navigate = useNavigate();

  useEffect(() => {
    const filterdPropertiesData =
      filterSelected.search !== ""
        ? propertiesData.filter((p, ind) => {
            if (
              p.title
                .toLowerCase()
                .includes(filterSelected.search.toLowerCase())
            )
              return p;
          })
        : propertiesData;

    const pn = Math.ceil(filterdPropertiesData.length / 10);
    setPagNum(pn);
    if (pn < pagination) setPagination(1);

    const val = pagination - 1;
    const newData = filterdPropertiesData.filter((e, ind) => {
      if (ind >= 0 + val * 10 && ind < 10 + val * 10) return e;
    });
    setData(newData);
  }, [pagination, filterSelected]);

  const handlePropertyClick = (ev: React.ChangeEvent<unknown>) => {
    const id = (ev.target as HTMLElement).getAttribute("id");
    navigate(`./show?id=${id}`);
  };
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPagination(value);
  };
  return (
    <Box pt={1}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography fontSize={"25px"} fontWeight={700} color="#11142D">
          Property List
        </Typography>
        <CustomButton
          type="contained"
          title="Add Property"
          backgroundColor="#475BE8"
          color="#FCFCFC"
          fullWidth={false}
          icon={<AddIcon />}
          disabled={false}
        />
      </Stack>
      <Box sx={{ backgroundColor: "#fff", p: 3, mt: 3, borderRadius: "12px" }}>
        <FiltersFroms
          filterSelected={filterSelected as FiltersSelected}
          setFilterSelected={setFilterSelected}
        />
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "2rem",
            padding: "2rem 0",
          }}
        >
          {data.length === 0 && (
            <Typography textAlign="center" width="100%" fontWeight={700} py={3}>
              Not Found
            </Typography>
          )}
          {data.map((property) => (
            <motion.div
              className="property-box"
              key={property.id}
              variants={item}
            >
              <img
                id={property.id.toString()}
                src={`./assests/${property.image}`}
                alt={property.image}
                onClick={handlePropertyClick}
                style={{
                  borderRadius: "12px",
                  maxWidth: "220px",
                  minWidth: "220px",
                  height: "130px",
                  objectFit: "cover",
                }}
              />
              <Stack className="property-info" gap={1}>
                <Box
                  sx={{
                    p: ".5rem",
                    borderRadius: 1,
                    color: "#475BE8",
                    backgroundColor: "#DADEFA",
                    width: "fit-content",
                    fontWeight: 600,
                    fontSize: 12,
                  }}
                >
                  ${property.price}
                </Box>
                <Typography
                  id={property.id.toString()}
                  fontWeight={600}
                  fontSize={16}
                  color="#11142D"
                  sx={{ cursor: "pointer" }}
                  onClick={handlePropertyClick}
                >
                  {property.title}
                </Typography>
                <Stack
                  direction="row"
                  alignItems="center"
                  gap={1}
                  sx={{ svg: { color: "#808191", fontSize: "14px" } }}
                >
                  <LocationOnIcon />{" "}
                  <Typography
                    textTransform="capitalize"
                    fontSize={14}
                    fontWeight={400}
                    color="#808191"
                  >
                    {property.location}
                  </Typography>
                </Stack>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  maxWidth="140px"
                >
                  {property.facillity.slice(0, 2).map((fac, ind) => (
                    <Stack
                      key={ind}
                      flex="flex"
                      direction="row"
                      alignItems="center"
                      gap={0.5}
                      sx={{ svg: { color: "#808191", fontSize: "16px" } }}
                    >
                      <KingBedIcon />{" "}
                      <Typography
                        textTransform="capitalize"
                        fontSize={12}
                        fontWeight={400}
                        color="#808191"
                      >
                        {fac?.count}
                        {fac.count && " "}
                        {fac.title}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>
              </Stack>
            </motion.div>
          ))}
        </motion.div>
        <Stack
          direction="row"
          alignItems="center"
          flexWrap="wrap"
          gap={2}
          sx={{ justifyContent: { xs: "center", sm: "space-between" } }}
        >
          <Typography fontSize={14} fontWeight={400} color="#808191">
            Showing {data.length === 0 ? "0" : `1 to ${data.length}`} Properties
          </Typography>
          <Pagination
            onChange={handleChange}
            count={pagNum}
            shape="rounded"
            color="standard"
            sx={{
              "	.MuiPaginationItem-root:hover": {
                color: "white",
                backgroundColor: "#475BE8",
              },
              ".Mui-selected": {
                color: "white",
                backgroundColor: "#475BE8 !important",
              },
            }}
          />
        </Stack>
      </Box>
    </Box>
  );
};

export default AllProperty;

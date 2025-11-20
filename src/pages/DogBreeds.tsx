import { useEffect, useState, useMemo, useContext } from "react";
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
} from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

import DogBreedsTable from "../components/DogBreedsTable";
import { ColorModeContext } from "../ColorModeContext";
import type { Breed } from "../types/dogApi";
import { breedNameToUrl } from "../utils/breedNameToUrl";

function DogBreeds() {
  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedBreed, setSelectedBreed] = useState<Breed | null>(null);
  const [detailsOpen, setDetailsOpen] = useState<boolean>(false);
  const { mode, toggleColorMode } = useContext(ColorModeContext);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleRowClick = async (breed: Breed) => {
    setSelectedBreed(breed);
    setDetailsOpen(true);

    // fetch image
    const name = breed.attributes.name;
    const urlName = breedNameToUrl(name);

    try {
      // Fetch images
      const response = await fetch(
        `https://dog.ceo/api/breed/${urlName}/images/random`
      );
      const data = await response.json();
      if (data.status === "success") {
        setImageUrl(data.message);
      } else {
        setImageUrl(null);
      }
    } catch {
      setImageUrl(null);
    }
  };

  const handleCloseDetails = () => {
    setDetailsOpen(false);
  };

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("https://dogapi.dog/api/v2/breeds");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const json = (await response.json()) as { data: Breed[] };
        setBreeds(json.data ?? []);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to load breeds";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchBreeds();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredBreeds = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return breeds;

    return breeds.filter((breed) => {
      const name = breed.attributes?.name ?? "";
      return name.toLowerCase().includes(term);
    });
  }, [breeds, searchTerm]);

  if (loading) return <Box p={2}>Loading dog breeds...</Box>;
  if (error)
    return (
      <Box p={2} color="red">
        Error: {error}
      </Box>
    );

  return (
    <Box
      sx={{
        p: 2,
        minHeight: "100vh",
        bgcolor: "background.default",
      }}
    >
      {/* Header row: title + theme toggle */}
      <Box
        sx={{
          mb: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <Typography variant="h3" component="h1">
          Dog Breeds
        </Typography>

        <Tooltip
          title={
            mode === "dark" ? "Switch to light mode" : "Switch to dark mode"
          }
        >
          <IconButton onClick={toggleColorMode} color="inherit">
            {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Tooltip>
      </Box>

      <Typography variant="body2" sx={{ mb: 1 }}>
        Total breeds: {breeds.length}
      </Typography>

      <Box sx={{ mb: 2, maxWidth: 400 }}>
        <TextField
          fullWidth
          label="Search by breed name"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </Box>

      <DogBreedsTable breeds={filteredBreeds} onRowClick={handleRowClick} />

      <Dialog
        open={detailsOpen}
        onClose={handleCloseDetails}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          {selectedBreed?.attributes.name ?? "Breed Details"}
        </DialogTitle>
        <DialogContent dividers>
          {imageUrl && (
            <img
              src={imageUrl}
              alt={selectedBreed?.attributes.name}
              style={{
                width: "100%",
                maxHeight: 250,
                objectFit: "cover",
                borderRadius: 8,
                marginBottom: 16,
              }}
            />
          )}

          {!imageUrl && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              (Image not available)
            </Typography>
          )}

          {/* Description + Details */}
          {selectedBreed && (
            <Stack spacing={1.5}>
              {selectedBreed.attributes.description && (
                <Typography variant="body2">
                  {selectedBreed.attributes.description}
                </Typography>
              )}

              <Typography variant="body2">
                <strong>Life span:</strong>{" "}
                {selectedBreed.attributes.life
                  ? `${selectedBreed.attributes.life.min}–${selectedBreed.attributes.life.max} years`
                  : "Unknown"}
              </Typography>
            </Stack>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetails}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default DogBreeds;

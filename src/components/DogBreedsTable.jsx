import { DataGrid } from "@mui/x-data-grid";

const DogBreedsTable = ({ breeds }) => {
  // Transform the API response into rows for data grid
  const rows = breeds.map((breed) => {
    const attrs = breed.attributes;

    return {
      id: breed.id,
      name: attrs.name,
      lifeSpan: attrs.life ? `${attrs.life.min}–${attrs.life.max}` : "Unknown",
      maleWeight: attrs.male_weight
        ? `${attrs.male_weight.min}–${attrs.male_weight.max} kg`
        : "—",
      femaleWeight: attrs.female_weight
        ? `${attrs.female_weight.min}–${attrs.female_weight.max} kg`
        : "—",
      hypoallergenic: attrs.hypoallergenic ? "Yes" : "No",
    };
  });

  const columns = [
    { field: "name", headerName: "Breed", flex: 1 },
    { field: "lifeSpan", headerName: "Life Span", width: 140 },
    { field: "maleWeight", headerName: "Male Weight", width: 140 },
    { field: "femaleWeight", headerName: "Female Weight", width: 140 },
    { field: "hypoallergenic", headerName: "Hypoallergenic", width: 150 },
  ];

  return (
    <div style={{ width: "100%" }}>
      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSizeOptions={[5, 10, 25]}
          initialState={{
            pagination: { paginationModel: { pageSize: 10, page: 0 } },
          }}
        />
      </div>
    </div>
  );
};

export default DogBreedsTable;

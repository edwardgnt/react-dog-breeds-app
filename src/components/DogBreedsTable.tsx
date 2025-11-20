import {
  DataGrid,
  type GridColDef,
  type GridRowParams,
} from "@mui/x-data-grid";
import type { Breed } from "../types/dogApi";

interface DogBreedsTableProps {
  breeds: Breed[];
  onRowClick?: (breed: Breed) => void;
}

interface BreedRow {
  id: string;
  name: string;
  lifeSpan: string;
  maleWeight: string;
  femaleWeight: string;
  hypoallergenic: string;
}

const DogBreedsTable: React.FC<DogBreedsTableProps> = ({
  breeds,
  onRowClick,
}) => {
  const rows: BreedRow[] = breeds.map((breed) => {
    const attrs = breed.attributes;
    const life = attrs.life;
    const male = attrs.male_weight;
    const female = attrs.female_weight;

    return {
      id: breed.id,
      name: attrs.name,
      lifeSpan: life ? `${life.min}–${life.max} yrs` : "Unknown",
      maleWeight: male ? `${male.min}–${male.max} kg` : "—",
      femaleWeight: female ? `${female.min}–${female.max} kg` : "—",
      hypoallergenic: attrs.hypoallergenic ? "Yes" : "No",
    };
  });

  const columns: GridColDef<BreedRow>[] = [
    { field: "name", headerName: "Breed", flex: 1, minWidth: 150 },
    { field: "lifeSpan", headerName: "Life Span", width: 140 },
    { field: "maleWeight", headerName: "Male Weight", width: 150 },
    { field: "femaleWeight", headerName: "Female Weight", width: 150 },
    { field: "hypoallergenic", headerName: "Hypoallergenic", width: 150 },
  ];

  const handleRowClick = (params: GridRowParams<BreedRow>) => {
    if (!onRowClick) return;

    const breed = breeds.find((b) => b.id === params.id);
    if (breed) {
      onRowClick(breed);
    }
  };

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
          onRowClick={handleRowClick}
          sx={{ "& .MuiDataGrid-row:hover": { cursor: "pointer" } }}
        />
      </div>
    </div>
  );
};

export default DogBreedsTable;

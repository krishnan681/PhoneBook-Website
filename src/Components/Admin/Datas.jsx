import React, { useState, useEffect } from "react";
import {
  DataGrid,
  GridToolbar
} from "@mui/x-data-grid";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Snackbar,
  Alert
} from "@mui/material";
import axios from "axios";

const Datas = () => {
  const [data, setData] = useState([]); // State to store the fetched data
  const [filteredData, setFilteredData] = useState([]); // State to store filtered data
  const [loading, setLoading] = useState(true); // State to handle loading
  const [openDialog, setOpenDialog] = useState(false); // State for edit dialog visibility
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false); // State for delete confirmation dialog
  const [editingRow, setEditingRow] = useState(null); // State to track the row being edited
  const [rowToDelete, setRowToDelete] = useState(null); // Row ID to delete
  const [searchQuery, setSearchQuery] = useState(""); // Search query
  const [newRow, setNewRow] = useState({
    businessname: "",
    doorno: "",
    city: "",
    pincode: "",
    prefix: "", // Added prefix field
    mobileno: "",
    email: "",
    product: "",
    landline: "",
    lcode: "",
  }); // New row data for create
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Snackbar state

  // Fetch data from the API on component mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://signpostphonebook.in/client_fetch.php"); // Replace with your API URL
      setData(response.data);
      setFilteredData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle search input changes
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = data.filter((row) =>
      Object.values(row).some((value) =>
        value.toString().toLowerCase().includes(query)
      )
    );

    setFilteredData(filtered);
  };

  // Handle updating an existing row
  const handleUpdateRow = async () => {
    try {
      const response = await axios.post("https://signpostphonebook.in/update_row.php", editingRow); // Replace with your API URL

      if (response.data.success) {
        setData((prevData) =>
          prevData.map((row) =>
            row.id === editingRow.id ? { ...row, ...editingRow } : row
          )
        );
        setFilteredData((prevData) =>
          prevData.map((row) =>
            row.id === editingRow.id ? { ...row, ...editingRow } : row
          )
        );
        setSnackbarOpen(true); // Show success snackbar
        setOpenDialog(false); // Close the dialog
        setEditingRow(null); // Reset the editing state
      } else {
        console.error("Update failed:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating row:", error);
    }
  };

  // Handle deleting a row
  const handleDeleteRow = async () => {
    try {
      const response = await axios.post("https://signpostphonebook.in/delete_row.php", { id: rowToDelete });

      if (response.data.success) {
        fetchData(); // Refresh the data
        setSnackbarOpen(true); // Show success message
        setDeleteDialogOpen(false); // Close the confirmation dialog
        setRowToDelete(null); // Reset the row to delete
      } else {
        console.error("Delete failed:", response.data.message);
      }
    } catch (error) {
      console.error("Error deleting row:", error);
    }
  };

  return (
    <Box
  m="20px"
  >
      
      {/* Snackbar for success notification */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success">
          Operation successful!
        </Alert>
      </Snackbar>


    <h1 style={{textAlign:"center",  }} >Data</h1>


      {/* Search input */}
      <TextField
        label="Search"
        variant="outlined"
        
        onChange={handleSearchChange}
        style={{ marginBottom: "10px", 
          width:"50vh",
          display:"flex"
        
        }}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={fetchData}
        style={{ marginBottom: "10px" }}
      >
        Refresh Data
      </Button>

      <Box
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "2px solid #1976d2",
            borderRadius: "8px",
            backgroundColor: "#f9f9f9",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "black",
            color: "#1976d2",
            fontSize: "16px",
            fontWeight: "bold",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "1px solid #ddd",
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "1px solid #ccc",
            backgroundColor: "#1976d2",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: "blue",
          },
          "& .MuiCheckbox-root": {
            color: "#1976d2",
          },
          "& .MuiDataGrid-row:hover": {
            backgroundColor: "#e3f2fd",
          },
        }}
      >
        <DataGrid
          rows={filteredData}
          columns={[
            { field: "id", headerName: "ID", flex: 0.5 },
            { field: "businessname", headerName: "Business Name", flex: 1 },
            { field: "doorno", headerName: "Door No", flex: 1 },
            { field: "city", headerName: "City", flex: 1 },
            { field: "pincode", headerName: "Pin Code", flex: 1 },
            { field: "prefix", headerName: "Prefix", flex: 0.5 },
            { field: "mobileno", headerName: "Mobile No", flex: 1 },
            { field: "email", headerName: "Email", flex: 1 },
            { field: "product", headerName: "Product", flex: 1 },
            { field: "landline", headerName: "Landline", flex: 1 },
            { field: "lcode", headerName: "LCode", flex: 0.5 },
            {
              field: "actions",
              headerName: "Actions",
              flex: 1,
              renderCell: (params) => (
                <Box>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      setEditingRow(params.row);
                      setOpenDialog(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => {
                      setRowToDelete(params.row.id);
                      setDeleteDialogOpen(true);
                    }}
                  >
                    Delete
                  </Button>
                </Box>
              ),
            },
          ]}
          getRowId={(row) => row.id}
          loading={loading}
          components={{ Toolbar: GridToolbar }}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10 },
            },
          }}
          // checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>

      {/* Dialog for editing */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Edit Row</DialogTitle>
        <DialogContent>
          {Object.keys(newRow).map((key) => (
            <TextField
              key={key}
              label={key.charAt(0).toUpperCase() + key.slice(1)}
              value={editingRow ? editingRow[key] : newRow[key]}
              onChange={(e) =>
                setEditingRow({ ...editingRow, [key]: e.target.value })
              }
              fullWidth
              margin="normal"
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleUpdateRow} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirmation Dialog for Deletion */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this row? This action cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDeleteDialogOpen(false)}
            color="secondary"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteRow}
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Datas;

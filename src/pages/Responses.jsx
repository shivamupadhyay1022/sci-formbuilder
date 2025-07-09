import React, { useEffect, useState } from "react";
import { supabase } from "../../supabase";
import { toast } from "sonner";
import Papa from "papaparse";
import MainLayout from "../components/layout/MainLayout";

const Responses = () => {
  const [forms, setForms] = useState([]);
  const [selectedForm, setSelectedForm] = useState("");
  const [formColumns, setFormColumns] = useState([]);
  const [responses, setResponses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showExportDropdown, setShowExportDropdown] = useState(false);

  // Fetch available forms
  useEffect(() => {
    const fetchForms = async () => {
      const { data, error } = await supabase.from("tables").select("id, name");
      if (error) {
        toast.error("Error loading forms");
      } else {
        setForms(data);
        if (data.length > 0) {
          setSelectedForm(data[0].id);
        }
      }
    };
    fetchForms();
  }, []);

  // Fetch columns for selected form
  useEffect(() => {
    const fetchColumns = async () => {
      if (!selectedForm) return;
      const { data, error } = await supabase
        .from("table_columns")
        .select("name")
        .eq("table_id", selectedForm)
        .order("position", { ascending: true });

      if (error) {
        toast.error("Error loading form columns");
      } else {
        setFormColumns(data.map((col) => col.name));
      }
    };
    fetchColumns();
  }, [selectedForm]);

  // Fetch responses for selected form
  useEffect(() => {
    const fetchResponses = async () => {
      if (!selectedForm) return;
      const { data, error } = await supabase
        .from("responses")
        .select("id, data, submitted_at")
        .eq("table_id", selectedForm);

      if (error) {
        toast.error("Error loading responses");
      } else {
        const formatted = data.map((res) => ({
          id: res.id,
          submitted_at: res.submitted_at,
          ...res.data, // flatten fields in `data`
        }));
        setResponses(formatted);
      }
    };
    fetchResponses();
  }, [selectedForm]);

  // Handle CSV export
  const handleExportCSV = () => {
    if (!formColumns.length || !responses.length) {
      toast.warning("Nothing to export");
      return;
    }

    const exportData = responses.map((res) => {
      const row = {};
      formColumns.forEach((col) => {
        row[col] =
          typeof res[col] === "object" && res[col] !== null
            ? JSON.stringify(res[col])
            : res[col] ?? "";
      });
      return row;
    });

    const csv = Papa.unparse(exportData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "responses.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter responses by search term
  const filteredResponses = responses.filter((res) =>
    formColumns.some((col) =>
      (res[col] || "")
        .toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
  );

  return (
    <MainLayout>
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Responses</h1>
          <button
            onClick={handleExportCSV}
            className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 text-sm"
          >
            Export CSV
          </button>
        </div>

        <div className="flex gap-4 mb-4">
          <select
            value={selectedForm}
            onChange={(e) => setSelectedForm(e.target.value)}
            className="border rounded px-3 py-2"
          >
            {forms.map((form) => (
              <option key={form.id} value={form.id}>
                {form.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded px-3 py-2 flex-1"
          />
          <button
            onClick={() => setShowExportDropdown((prev) => !prev)}
            className="border-1 border-gray-500  px-4 py-2 rounded hover:bg-primary/90 text-sm"
          >
            Export
          </button>

          {showExportDropdown && (
            <div
              className="absolute right-0 mt-2 w-40 bg-white border rounded shadow z-50"
              onMouseLeave={() => setShowExportDropdown(false)}
            >
              <button
                onClick={() => {
                  handleExportCSV();
                  setShowExportDropdown(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
              >
                Export as CSV
              </button>

              {/* Future options like Excel or PDF can go here */}
            </div>
          )}
        </div>

        <div className="overflow-x-auto border rounded">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100">
              <tr>
                {formColumns.map((col) => (
                  <th key={col} className="px-4 py-2 capitalize">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredResponses.length === 0 ? (
                <tr>
                  <td
                    colSpan={formColumns.length}
                    className="px-4 py-6 text-center text-muted-foreground"
                  >
                    No responses found.
                  </td>
                </tr>
              ) : (
                filteredResponses.map((res) => (
                  <tr key={res.id} className="border-t hover:bg-gray-50">
                    {formColumns.map((col) => (
                      <td key={col} className="px-4 py-2">
                        {typeof res[col] === "object" && res[col] !== null
                          ? JSON.stringify(res[col])
                          : res[col] ?? "—"}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </MainLayout>
  );
};

export default Responses;

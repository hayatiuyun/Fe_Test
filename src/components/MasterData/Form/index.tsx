import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Modal,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
} from "@mui/material";
import { postRuas } from "@/lib/postRuas";
import { revalidatePath } from "next/cache";
import { getOneRuas } from "@/lib/getOneRuas";

type FormData = {
  id: number | undefined; // Optional ID for editing
  unit_id: number | string;
  ruas_name: string;
  long: string;
  km_awal: string;
  km_akhir: string;
  status: string;
  photo: FileList;
  file: FileList;
  unit: any;
};

type FormDataInitials = {
  id: number | undefined; // Optional ID for editing
  unit_id: number | string;
  ruas_name: string;
  long: string;
  km_awal: string;
  km_akhir: string;
  status: string;
  unit: UnitOption;

};

interface UnitOption {
  id: number;
  unit: string;
}

type Props = {
  isOpen: boolean;
  onClose: () => void;
  units: UnitOption[];
  values?: number | undefined; // Optional initial values for editing
  isView: boolean;
};

const initialValuesState = {
  unit_id: "",
  ruas_name: "",
  long: "",
  km_awal: "",
  km_akhir: "",
  status: "1",
  id: undefined,
  unit: {
    unit: "",
    id: 0,
  },
};

const FormMasterData: React.FC<Props> = ({
  isOpen,
  onClose,
  units,
  values,
  isView,
}) => {
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const [currentData, setCurrentData] =
    useState<FormDataInitials>(initialValuesState);

  const getRuasById = async () => {
    const ruas = await getOneRuas(values);
    console.log(ruas?.data);
    setCurrentData(ruas?.data);

    setValue("id", values)
    setValue("ruas_name", ruas?.data?.ruas_name)
    setValue("unit_id", ruas?.data?.unit_id)
    setValue("long", ruas?.data?.long)
    setValue("km_awal", ruas?.data?.km_awal)
    setValue("km_akhir", ruas?.data?.km_akhir)
  };

  const MAX_FILE_SIZE_MB = 10; // Example: 10 MB limit
  const allowedPhotoTypes = ["image/jpeg", "image/png", "image/gif"];
  const allowedFileTypes = ["application/pdf", "text/plain"];

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log("TRIGGERED");
    
    try {
      const formData = new FormData();
      if (values) {
        formData.append("id", values.toString()); // Add ID for editing
        formData.append("_method", "PUT");
        formData.append("unit_id", currentData?.unit_id.toString());
      } else {
        formData.append("unit_id", data.unit_id.toString());
      }
      formData.append("ruas_name", data.ruas_name);
      formData.append("long", data.long);
      formData.append("km_awal", data.km_awal);
      formData.append("km_akhir", data.km_akhir);
      formData.append("status", data.status);

      formData.append("photo", data.photo[0]);
      formData.append("file", data.file[0]);
      console.log("WILL UPDATE");
      

      const response = await postRuas(formData, values);
      console.log("Form submitted successfully!", response);

      reset(initialValuesState);
      handleResetAndClose();
      // Close modal after successful submission
    } catch (error) {
      console.error("Form submission error", error); // Handle form submission error
    }
    // revalidatePath("/master-data"); // Uncomment if revalidatePath is defined
  };

  const handleResetAndClose = () => {
    reset(initialValuesState);
    onClose();
  };

  const handleAutocompleteChange = (
    event: React.ChangeEvent<{}>,
    value: UnitOption | null
  ) => {
    if (value) {
      setValue("unit_id", value.id); // Update the unit_id field value
    } else {
      setValue("unit_id", ""); // Handle case when value is null
    }
  };

  useEffect(() => {
    if (values) {
      getRuasById();
      
    }
  }, [values]);
  

  return (
    <Modal
      open={isOpen}
      onClose={handleResetAndClose}
      className="flex items-center justify-center"
    >
      <div className="modal-container bg-white p-4 rounded-lg md:w-96 w-full lg:w-[65vw]">
        <h1 className="mx-auto text-2xl font-semibold text-center pt-4 mb-8">
          {values ? "Edit Data Ruas" : "Tambah Data Ruas"}
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* Left Column */}
          <div className="col-span-1 md:col-span-1 grid gap-4">
            <div>
              <span className="">Nama Ruas</span>
              <TextField
                {...register("ruas_name", { required: true })}
                defaultValue={currentData?.ruas_name}
                fullWidth
                disabled={isView}
              />
              {errors.ruas_name && (
                <p className="text-red-500">Nama Ruas is required.</p>
              )}
            </div>
            <div>
              <span className="">Unit Kerja</span>
              {isView ? <TextField
                {...register("unit", { required: true })}
                defaultValue={currentData?.unit.unit}
                fullWidth
                disabled={isView}
              /> : (<Autocomplete
                  options={units}
                  getOptionLabel={(option: any) => option.unit}
                  onChange={handleAutocompleteChange}
                  defaultValue={currentData?.unit}
                  disabled={isView}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      error={!!errors.unit_id}
                    />
                  )}
                />)}
              {!values && errors.unit_id && (
                <p className="text-red-500">Unit Kerja is required.</p>
              )}
            </div>
            <div className="flex flex-col py-3.5">
              <span className="">Photo</span>
              <input
                type="file"
                disabled={isView}
                {...register("photo", {
                  required: !currentData?.id, // Not required when editing
                  ...(!values
                    ? {
                        validate: {
                          fileSize: (fileList: FileList) =>
                            fileList[0].size <= MAX_FILE_SIZE_MB * 1024 * 1024,
                          fileType: (fileList: FileList) =>
                            allowedPhotoTypes.includes(fileList[0].type),
                        },
                      }
                    : {}),
                })}
              />
              {errors.photo && (
                <p className="text-red-500">
                  Photo is required and must be a JPG, JPEG, PNG, or GIF file
                  under {MAX_FILE_SIZE_MB} MB.
                </p>
              )}
            </div>
            <div className="flex flex-col py-3.5">
              <span className="">File</span>
              <input
                type="file"
                disabled={isView}
                {...register("file", {
                  required: !currentData?.id, // Not required when editing
                  ...(!values
                    ? {
                        validate: {
                          fileSize: (fileList: FileList) =>
                            fileList[0].size <= MAX_FILE_SIZE_MB * 1024 * 1024,
                          fileType: (fileList: FileList) =>
                            allowedFileTypes.includes(fileList[0].type),
                        },
                      }
                    : {}),
                })}
              />
              {errors.file && (
                <p className="text-red-500">
                  File is required and must be a PDF or plain text file under{" "}
                  {MAX_FILE_SIZE_MB} MB.
                </p>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="col-span-1 md:col-span-1 grid gap-4">
            <div className="flex flex-col">
              <span className="">Panjang (Km)</span>
              <TextField
                disabled={isView}
                {...register("long", {
                  required: true,
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Panjang (Km) harus berupa angka.",
                  },
                })}
                defaultValue={currentData.long}
                fullWidth
              />
              {errors.long && (
                <p className="text-red-500">{errors.long.message}</p>
              )}
            </div>
            <div className="flex flex-col">
              <span className="">Km Awal</span>
              <TextField
                disabled={isView}
                {...register("km_awal", {
                  required: true,
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Km Awal harus berupa angka.",
                  },
                })}
                defaultValue={currentData?.km_awal}
                fullWidth
              />
              {errors.km_awal && (
                <p className="text-red-500">{errors.km_awal.message}</p>
              )}
            </div>
            <div className="flex flex-col">
              <span className="">Km Akhir</span>
              <TextField
                disabled={isView}
                {...register("km_akhir", {
                  required: true,
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Km Akhir harus berupa angka.",
                  },
                })}
                defaultValue={currentData?.km_akhir}
                fullWidth
              />
              {errors.km_akhir && (
                <p className="text-red-500">{errors.km_akhir.message}</p>
              )}
            </div>
            <div className="flex flex-col">
              <span className="">Status</span>
              <FormControl fullWidth>
                <Select
                  disabled={isView}
                  {...register("status", { required: true })}
                  defaultValue={currentData?.status}
                >
                  <MenuItem value="1">Active</MenuItem>
                  <MenuItem value="0">Inactive</MenuItem>
                </Select>
                {errors.status && (
                  <p className="text-red-500">Status is required.</p>
                )}
              </FormControl>
            </div>
          </div>

          {/* Submit Button */}
          <div className="col-span-2">
            <div className="w-full flex flex-row items-center lg:justify-end gap-4">
              <Button
                type="button"
                variant="text"
                onClick={handleResetAndClose}
              >
                {isView ? "Close" : "Cancel"}
              </Button>
             {
              !isView && ( <Button type="submit" variant="contained">
              {values ? "Update" : "Submit"}
            </Button>)
             }
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default FormMasterData;

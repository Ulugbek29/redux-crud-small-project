import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import PropTypes from "prop-types";
import Input from "./Form/Input";
import { useForm } from "react-hook-form";
import MuiCheckbox from "../components/Form/MuCheckbox"
import MuDatePicker from "../components/Form/MuDatePicker"
import { createTaskAction } from "../redux/actions/tasksAction";
import { useDispatch } from "react-redux";

export default function CreateTaskModal({ handleClose = () => {}, open }) {
  const dispatch = useDispatch();
  const {
    control,
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      date: new Date(),
      done: false,
    },
  });

  const errorMessage = "This is required field";


  const onSubmit = (value) => {
    dispatch(createTaskAction(value));
    reset()
    handleClose();
  };
  return (
    <>
      <Dialog fullWidth onClose={handleClose} open={open}>
        <DialogContent style={{ minHeight: 500 }} dividers>
          <div>
            <p className="text-center text-3xl">Hook Form</p>
            <div className="w-full flex justify-center">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-[400px] border-[lightgray] border-[1px] rounded-md p-4"
              >
                <div className="flex flex-col gap-3 mb-3">
                  <label>Name</label>
                  <Input
                    type="text"
                    placeholder="Name"
                    name="name"
                    {...register("name", {
                      required: errorMessage,
                    })}
                  />

                  <ErrorMessage error={errors?.name?.message} />
                </div>
                <div className="flex flex-col gap-3 mb-3">
                  <label>Description</label>
                  <Input
                    type="text"
                    placeholder="Description"
                    name="description"
                    {...register("description", {
                      required: false,
                    })}
                  />
                </div>

                <div className="mb-[12px]">
                    <MuDatePicker
                    control={control}
                    label="Date picker"
                    name="created_date"
                     />
                </div>

                <div>
                <MuiCheckbox 
                  control={control}
                  name="done"
                  label="IsDone"
                />
                </div>

                <Button type="submit" variant="contained">
                  Submit
                </Button>
              </form>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

CreateTaskModal.propTypes = {
  handleClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  //   title: PropTypes.string.isRequired,
};

CreateTaskModal.defaultProps = {
  open: true,
};

const ErrorMessage = ({ error }) => {
  return <div className="text-[red]">{error}</div>;
};

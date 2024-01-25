import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import PropTypes from "prop-types";
import Input from "./Form/Input";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { useDispatch } from "react-redux";
import MuiCheckbox from "../components/Form/MuCheckbox"
import MuDatePicker from "../components/Form/MuDatePicker"
import { useSelector } from "react-redux";
import { editTaskAction } from "../redux/actions/tasksAction";

export default function EditModal({ handleClose = () => {}, open, id }) {
  const tasks = useSelector((state) => state?.data?.tasks);

  const taskData = tasks.find((el, index) => index == id);

  console.log("task", taskData);
  const dispatch = useDispatch();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      date: new Date(),
      done: false,
    },
  });

  const errorMessage = "This is required field";

  React.useEffect(() => {
    if (taskData) {
      const data = {
        name: taskData.name,
        created_date: taskData.created_date,
        description: taskData.description,
        done: taskData.done,
      };
      reset(data);
    }
  }, [reset, taskData]);


  const onSubmit = (value) => {
    dispatch(editTaskAction(id, value));
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

EditModal.propTypes = {
  handleClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  //   title: PropTypes.string.isRequired,
};

EditModal.defaultProps = {
  open: true,
};

const ErrorMessage = ({ error }) => {
  return <div className="text-[red]">{error}</div>;
};

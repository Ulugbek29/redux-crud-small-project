// YourTableComponent.jsx
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { useDispatch } from "react-redux";
import {
  fetchTasksAction,
  createTaskAction,
  deleteTaskAction,
} from "../redux/actions/tasksAction";
import { tasks as taskData } from "../constants";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import CreateTaskModal from "./CreateModal";
import EditModal from "./EditModal";
// Import the generated Tailwind CSS file

const TasksTable = () => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const [taskIndex, setTaskIndex] = useState();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const tasks = useSelector((state) => state?.data?.tasks);

  console.log(tasks)
  useEffect(() => {
    dispatch(fetchTasksAction(taskData));
  }, [dispatch]);

  const data = {
    name: "new task",
    created_date: new Date(),
    done: true,
    description: "new task description",
  };

  const columns = [
    {
      key: "name",
      title: "Name",
      dataIndex: "name",
    },
    {
      key: "created_date",
      title: "Crated Date",
      render: (item, index) => (
        <div>{dayjs(item.created_date).format("DD/MM/YYYY")}</div>
      ),
    },
    {
      key: "status",
      title: "Status",
      dataIndex: "done",
      render: (item, index) => (
        <div
          className={`text-xl ${item.done ? "text-green-300" : "text-red-300"}`}
        >
          {item.done ? "Finishied" : "Not finished"}
        </div>
      ),
    },
    {
      key: "description",
      title: "Description",
      dataIndex: "description",
    },
    {
      key: "actions",
      title: "Actions",
      render: (item, index) => (
        <div className="flex gap-1">
          <Button
          color="warning"
          variant="outlined"
            onClick={() => {
              console.log("index", index);

              setTaskIndex("" + index);
            }}
          >
            Edit
          </Button>

          <Button
            color="error"
            variant="outlined"
            onClick={() => {
              console.log("DeleteIndex", index);
              dispatch(deleteTaskAction(index))
              // setTaskIndex("" + index);
            }}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-8">
      <h2 className="text-3xl">Task Table</h2>
      <Button variant="outlined" onClick={handleClickOpen}>
        Create Task
      </Button>
      <TableContainer
        component={Paper}
        className="max-w-full mx-auto mt-8 border-gray"
      >
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((el) => (
                <TableCell key={el.key}>{el.title}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((row, index) => (
              <TableRow key={index}>
                {columns.map((column, i) => (
                  <TableCell key={i}>
                    {column.render
                      ? column.render(row, index)
                      : row[column.dataIndex]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <CreateTaskModal handleClose={handleClose} open={open} />
      <EditModal
        id={taskIndex}
        handleClose={() => setTaskIndex(null)}
        open={!!taskIndex}
      />
    </div>
  );
};

export default TasksTable;

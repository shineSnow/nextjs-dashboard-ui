"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import Image from "next/image";

const TeacherForm = dynamic(() => import("./forms/TeacherForm"), {
  loading: () => <div>Loading...</div>,
});

const StudentForm = dynamic(() => import("./forms/SutdentForm"), {
  loading: () => <div>Loading...</div>,
});

interface FormModalProps {
  table:
    | "teacher"
    | "student"
    | "parent"
    | "subject"
    | "class"
    | "lesson"
    | "exam"
    | "assignment"
    | "result"
    | "attendance"
    | "event"
    | "announcement";
  type: "create" | "update" | "delete";
  data?: any;
  id?: number;
}

const forms: {
  [key: string]: (type: "create" | "update", data?: any) => JSX.Element;
} = {
  teacher: (type, data) => <TeacherForm type={type} data={data} />,
  student: (type, data) => <StudentForm type={type} data={data} />,
};

const FormModal = ({ table, type, data, id }: FormModalProps) => {
  const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
  const bgColor =
    type === "create"
      ? "bg-lamaYellow"
      : type === "update"
      ? "bg-lamasKey"
      : "bg-lamaPurple";
  const [open, setOpen] = useState(false);
  const Form = () => {
    return type === "delete" && id ? (
      <form action={""} className="p-4 flex flex-col gap-4">
        <span className="text-center font-medium">
          All data will be lost. Are you sure yu want to delete this {table}?
        </span>
        <button className="bg-red-700 text-white py-2 px-4 rounded-md border-none w-max self-center">
          Delete
        </button>
      </form>
    ) : type === "create" || type === "update" ? (
      forms[table](type, data)
    ) : (
      "Form not found"
    );
  };
  return (
    <>
      <button
        className={`${size} flex justify-center items-center rounded-full ${bgColor} `}
        onClick={() => setOpen(true)}
      >
        <Image src={`/${type}.png`} alt="" width={16} height={16} />
      </button>
      {open && (
        <div className="w-screen h-screen absolute left-0 top-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
          <div
            className="bg-white p-4 pt-8 rounded-md relative w-[90
          %] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]"
          >
            <Form />
            <div
              className="absolute top-4  cursor-pointer"
              onClick={() => setOpen(false)}
            >
              <Image src="/close.png" alt="" width={14} height={14} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FormModal;

import ActionForm from "../actionForm";

const FormAddOrUpdate = ({
  title,
  handleAdd,
  handleUpdate,
  isUpdate,
  handleClose,
  children,
}: {
  title: string;
  handleAdd: Function;
  handleUpdate: Function;
  isUpdate: boolean;
  handleClose: Function;
  children: React.ReactNode;
}) => {
  return (
    <>
      <h1>{title}</h1>
      {children}
      <ActionForm onConfirm={() => {}} onCancel={() => {}} />
    </>
  );
};

export default FormAddOrUpdate;

import { Formik, FormikProps } from "formik";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import * as yup from "yup";

export interface TestFormValues {
  name: string;
  phone: string;
  age: number;
}
export const validationSchema = yup.object({
  age: yup.number().required().min(1, "Age must be more than 1"),
});
export const initialValues: TestFormValues = {
  name: "",
  phone: "",
  age: 0,
};

export function App() {
  const handleSubmit = (values: TestFormValues) => {
    console.log(values);
  };
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {(formik: FormikProps<TestFormValues>) => (
          <form>
            <TextField
              id="name"
              name="name"
              type="text"
              label="Name"
              inputProps={{ "data-testid": "name" }}
              value={formik.values.name}
              onChange={formik.handleChange}
              disabled={formik.values.age < 18 ? true : false}
            ></TextField>
            <TextField
              id="age"
              name="age"
              type="number"
              label="Age"
              inputProps={{ "data-testid": "age" }}
              value={formik.values.age}
              onChange={formik.handleChange}
            ></TextField>
            <Button
              onClick={formik.submitForm}
              color="primary"
              variant="contained"
            >
              Submit
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
}

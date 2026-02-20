import RegistrationForm from "./components/RegistrationForm";
import FormikForm from "./components/formikForm";

function App() {
  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>User Registration</h1>

      {/* Controlled Component Version */}
      <RegistrationForm />

      <hr style={{ margin: "2rem 0" }} />

      {/* Formik Version */}
      <FormikForm />
    </div>
  );
}

export default App;

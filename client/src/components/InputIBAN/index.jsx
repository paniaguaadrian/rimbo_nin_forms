// Styles
import styles from "./input.iban.module.scss";

const InputIBAN = ({ label, error, ...rest }) => {
  return (
    <div className={styles.InputIBAN}>
      <label>{label}</label>
      <input {...rest} />
      {error && (
        <div className={styles.InputErrorContainer}>
          <span className={styles.InputError}>{error}</span>
        </div>
      )}
    </div>
  );
};

export default InputIBAN;

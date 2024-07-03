export function clearForm(formId: string) {
  const formElement = document.getElementById(formId) as HTMLFormElement;

  if (formElement) {
    formElement.reset();
  }
}

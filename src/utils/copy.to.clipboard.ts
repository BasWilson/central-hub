export default (stringToCopy: string) => {
    navigator.clipboard.writeText(stringToCopy);
}
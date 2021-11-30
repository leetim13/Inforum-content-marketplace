export function fileParser(e, callback) {
    let reader = new FileReader();
    reader.onload = callback;
    // reader.readAsDataURL(e.target.files[0]);
    reader.readAsBinaryString(e.target.files[0]);
}
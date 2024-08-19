export function createDownloadFile(file: BlobPart, fileName: string) {
	const f = new File([file], fileName);
	const a = document.createElement('a');
	a.href = URL.createObjectURL(f);
	a.download = fileName;
	a.click();
	a.remove();
}

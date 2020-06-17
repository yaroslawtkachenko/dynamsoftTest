import Dynamsoft from "dynamsoft-javascript-barcode";

Dynamsoft.BarcodeReader.engineResourcePath = "https://cdn.jsdelivr.net/npm/dynamsoft-javascript-barcode@7.4.0-v1/dist/";
// Please visit https://www.dynamsoft.com/CustomerPortal/Portal/TrialLicense.aspx to get a trial license
Dynamsoft.BarcodeReader.productKeys = "t0068NQAAAFTH2qfQnjClfiaLvVvznedxl7tq1K8XQKWA5pCFT1/Ck6vhubNLx3yFRIfO4nclMjW9CYZEdcNfDs5vnPJlin8=";
// Dynamsoft.BarcodeReader._bUseFullFeature = true; // Control of loading min wasm or full wasm.
export default Dynamsoft;
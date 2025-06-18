export interface RawOcrResult {
  text: string;
}

export interface AadhaarData {
  name?: string;
  dob?: string;
  aadhaarNumber?: string;
  [key: string]: any;
}

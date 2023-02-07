
export interface DirTypes {
  path:    string;
  content: Content;
  success: boolean;
}

export interface Content {
  files:       any[];
  directories: string[];
}

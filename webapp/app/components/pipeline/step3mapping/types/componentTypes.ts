import { MappingGroup } from "@/app/common/dtos/PipelineSchemaResponseDto";

export interface MappingFieldsProps {
  options: SchemaOptions[];
  mappingGroups: MappingGroup[];
  values?: any;
  setFieldValue?: (field: string, value: any, shouldValidate?: boolean) => void;
  setFieldTouched?: (
    field: string,
    isTouched?: boolean,
    shouldValidate?: boolean
  ) => void;
}

export interface SchemaOptions {
  value: any;
  description?: string;
}

// export interface MappingFieldsProps {
//   title: string | undefined;
//   description?: string;
//   options: SchemaOptions[];
//   setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
//   setFieldTouched: (value: any) => void;
//   fieldName: string,
// }

// export interface SchemaOptions {
//   value: any;
//   title: string;
//   description?: string;
// }
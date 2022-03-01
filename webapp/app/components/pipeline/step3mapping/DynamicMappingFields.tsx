import { FormFieldMeta, FormFieldsDto } from "@/app/common/dtos/FormFieldsDto";
import InputCheckbox from "../../forminputs/InputCheckbox";
import InputField from "../../forminputs/InputField";
import InputFile from "../../forminputs/InputFile";
import InputSelect from "@/app/components/forminputs/InputSelect";
import { AxiosResponse } from "axios";
import { DataFetcherResponseDto } from "@/app/common/dtos/DataFetcherResponseDto";
import _ from "lodash";
import { FormFieldType } from "@/app/common/enums/FormFieldType";
import dynamicFormUtils from "@/app/common/utils/dynamicFormUtils";
import { PipelineSchemaResponseDto } from "@/app/common/dtos/PipelineSchemaResponseDto";
import MappingImportantFields from "./components/MappingImportantFields";
import MappingMiscellaneousFields from "./components/MappingMiscellaneousFields";
import MappingPrimaryKeyFields from "./components/MappingPrimaryKeyFields";
import MappingDestinationFields from "./components/MappingDestinationFields";

export interface DynamicMappingFieldsProps {
  namePrefix?: string;
  mappingFields?: PipelineSchemaResponseDto;
  skipNames?: string[];
  values: any;
  setFieldValue?: (field: string, value: any, shouldValidate?: boolean) => void;
  setFieldTouched?: (
    field: string,
    isTouched?: boolean,
    shouldValidate?: boolean
  ) => void;
  setFieldError?: (field: string, message: string | undefined) => void;
  errors: any;
}

const fieldRenderers: {
  [key: string]: {
    renderer: any;
  };
} = {
  IMPORTANT_PARAMS: { renderer: MappingImportantFields },
  PRIMARY_KEYS: { renderer: MappingPrimaryKeyFields },
  DESTINATION_FIELDS: { renderer: MappingDestinationFields },
  MISCELLANEOUS_FIELDS: { renderer: MappingMiscellaneousFields },
};

const DynamicMappingFields = ({
  mappingFields,
  values,
  setFieldValue,
  errors
}: // dataFetcher,
DynamicMappingFieldsProps) => {
  if (
    !mappingFields?.warehouseSchema.fields ||
    !mappingFields?.mappingGroups.length
  )
    return null;

  const { warehouseSchema, mappingGroups } = mappingFields;

  const fields: Array<any> = [];

  // Display
  for (const fieldInfo of mappingGroups) {
    const fieldRenderer = fieldRenderers[fieldInfo.type];

    if (!fieldRenderer) {
      console.error("Field renderer not found for type " + fieldInfo.type);
      continue;
    }

    const appSchemaOptions = warehouseSchema.fields.map((field) => ({
      value: field.fieldName,
      label: field.fieldDisplayName,
    }));

    const { renderer: Input } = fieldRenderer;
    const name = `mapping.${fieldInfo.type}`;

    fields.push(
      <Input
        key={name}
        mappingGroups={mappingGroups}
        options={appSchemaOptions}
        name={name}
        defaultValue=""
        values={values}
        setFieldValue={setFieldValue}
        errors={errors}
        // required={field.validations.required}
        // {...field.fieldProps}
        // {...props}
        // dValues={depValues}
        // dataFetcher={dataFetcher}
        // deps={formFields.groupActivators[field.group]?.dependencies}
        // title={field.fieldProps.title || key}
      />
    );
  }
  return <>{fields}</>;
};

export default DynamicMappingFields;
